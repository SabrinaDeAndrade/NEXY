package com.example.NEXY.service;

import com.example.NEXY.model.Carrinho;
import com.example.NEXY.model.CarrinhoItem;
import com.example.NEXY.model.Produto;
import com.example.NEXY.repository.CarrinhoItemRepository;
import com.example.NEXY.repository.CarrinhoRepository;
import com.example.NEXY.repository.ProdutoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarrinhoItemService {
    private final CarrinhoItemRepository carrinhoItemRepository;
    private final ProdutoRepository produtoRepository;
    private final CarrinhoRepository carrinhoRepository;

    public CarrinhoItemService(CarrinhoItemRepository carrinhoItemRepository,
                               ProdutoRepository produtoRepository,
                               CarrinhoRepository carrinhoRepository) {
        this.carrinhoItemRepository = carrinhoItemRepository;
        this.produtoRepository = produtoRepository;
        this.carrinhoRepository = carrinhoRepository;
    }

    @Transactional
    public CarrinhoItem criar(CarrinhoItem item) {
        Produto produto = produtoRepository.findById(item.getProduto().getId())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado."));

        Carrinho carrinho = carrinhoRepository.findById(item.getCarrinho().getId())
                .orElseThrow(() -> new RuntimeException("Carrinho não encontrado."));

        // MELHORIA: Verifica se o item já existe no carrinho
        Optional<CarrinhoItem> itemExistenteOpt = carrinhoItemRepository
                .findByCarrinhoIdAndProdutoId(carrinho.getId(), produto.getId());

        CarrinhoItem itemSalvo;

        if (itemExistenteOpt.isPresent()) {
            // Se já existe, apenas atualiza a quantidade
            CarrinhoItem itemExistente = itemExistenteOpt.get();
            itemExistente.setQuantidade(itemExistente.getQuantidade() + item.getQuantidade());
            itemSalvo = carrinhoItemRepository.save(itemExistente);
        } else {
            // Se não existe, cria um novo item
            CarrinhoItem novoItem = new CarrinhoItem();
            novoItem.setProduto(produto);
            novoItem.setCarrinho(carrinho);
            novoItem.setQuantidade(item.getQuantidade());
            novoItem.setPrecoUnitario(produto.getPreco()); // Mais seguro usar o preço do produto do banco
            itemSalvo = carrinhoItemRepository.save(novoItem);
        }

        // Atualiza o valor total do carrinho
        recalcularTotalDoCarrinho(carrinho);

        return itemSalvo;
    }

    @Transactional
    public CarrinhoItem atualizarQuantidade(Long id, int quantidade) {
        CarrinhoItem item = carrinhoItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item do carrinho não encontrado com id: " + id));

        Carrinho carrinho = item.getCarrinho();

        if (quantidade <= 0) {
            carrinhoItemRepository.delete(item);
            recalcularTotalDoCarrinho(carrinho);
            return null;
        }

        item.setQuantidade(quantidade);
        CarrinhoItem itemSalvo = carrinhoItemRepository.save(item);

        recalcularTotalDoCarrinho(carrinho);

        return itemSalvo;
    }

    @Transactional
    public void delete(Long id) {
        System.out.println("Iniciando a exclusão do item ID: " + id);
        CarrinhoItem item = carrinhoItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item do carrinho não encontrado com id: " + id));

        Carrinho carrinho = item.getCarrinho();
        if (carrinho == null) {
            System.out.println("ERRO: O item " + id + " não está associado a nenhum carrinho.");
            carrinhoItemRepository.delete(item);
            return;
        }
        System.out.println("Item " + id + " encontrado. Pertence ao carrinho ID: " + carrinho.getId() + ". Deletando...");

        // 3. Deleta o item. O @PreRemove que adicionamos será acionado aqui.
        carrinhoItemRepository.delete(item);

        System.out.println("Item " + id + " deletado do repositório. Recalculando total do carrinho " + carrinho.getId());

        // 4. Recalcula o total do carrinho.
        recalcularTotalDoCarrinho(carrinho);

        System.out.println("Total do carrinho " + carrinho.getId() + " recalculado. Finalizando transação.");
    }

    // Método privado para manter a consistência do valor total do carrinho
    private void recalcularTotalDoCarrinho(Carrinho carrinho) {
        List<CarrinhoItem> itens = carrinhoItemRepository.findByCarrinhoId(carrinho.getId());
        double novoTotal = itens.stream()
                .mapToDouble(item -> item.getPrecoUnitario() * item.getQuantidade())
                .sum();
        carrinho.setValorTotal(novoTotal);
        carrinhoRepository.save(carrinho);
    }

    // --- MÉTODOS AUXILIARES (sem mudanças) ---
    public List<CarrinhoItem> findAll() { return carrinhoItemRepository.findAll(); }
    public Optional<CarrinhoItem> findById(Long id) { return carrinhoItemRepository.findById(id); }
    public List<CarrinhoItem> findByCarrinhoId(Long carrinhoId) { return carrinhoItemRepository.findByCarrinhoId(carrinhoId); }
}

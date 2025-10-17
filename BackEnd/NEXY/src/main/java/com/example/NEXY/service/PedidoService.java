package com.example.NEXY.service;

import com.example.NEXY.model.*;
import com.example.NEXY.repository.CarrinhoRepository;
import com.example.NEXY.repository.ClienteRepository;
import com.example.NEXY.repository.EnderecoRepository;
import com.example.NEXY.repository.PedidoRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final CarrinhoRepository carrinhoRepository;
    private final ClienteRepository clienteRepository;
    private final EnderecoRepository enderecoRepository;

    public PedidoService(PedidoRepository pedidoRepository, CarrinhoRepository carrinhoRepository, ClienteRepository clienteRepository, EnderecoRepository enderecoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.carrinhoRepository = carrinhoRepository;
        this.clienteRepository = clienteRepository;
        this.enderecoRepository = enderecoRepository;
    }
    @Transactional
    public Pedido finalizarCompra(Long clienteId, Long enderecoId, String cartaoToken) {
        // 1. Validar e buscar as entidades principais
        Cliente cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado."));

        Endereco endereco = enderecoRepository.findById(enderecoId)
                .orElseThrow(() -> new RuntimeException("Endereço não encontrado."));

        Carrinho carrinho = carrinhoRepository.findByClienteId(clienteId)
                .orElseThrow(() -> new RuntimeException("Carrinho não encontrado ou vazio."));

        if (carrinho.getItens() == null || carrinho.getItens().isEmpty()) {
            throw new RuntimeException("Seu carrinho está vazio.");
        }

        // 2. Processar o pagamento com a API do Mercado Pago (aqui é uma simulação)
        // boolean pagamentoAprovado = mercadoPagoService.processarPagamento(carrinho.getValorTotal(), cartaoToken);
        // if (!pagamentoAprovado) {
        //     throw new RuntimeException("Pagamento recusado.");
        // }

        // 3. Criar o Pedido
        Pedido novoPedido = new Pedido();
        novoPedido.setCliente(cliente);
        novoPedido.setEndereco(endereco);
        novoPedido.setDataPedido(new Date());
        novoPedido.setStatus("PAGAMENTO_APROVADO");
        novoPedido.setValorTotal(carrinho.getValorTotal());

        // 4. Converter Itens do Carrinho em Itens do Pedido
        List<PedidoItem> itensDoPedido = new ArrayList<>();
        for (CarrinhoItem itemCarrinho : carrinho.getItens()) {
            PedidoItem itemPedido = new PedidoItem();
            itemPedido.setPedido(novoPedido);
            itemPedido.setProduto(itemCarrinho.getProduto());
            itemPedido.setQuantidade(itemCarrinho.getQuantidade());
            itemPedido.setPrecoUnitario(itemCarrinho.getPrecoUnitario());
            itensDoPedido.add(itemPedido);
        }
        novoPedido.setItens(itensDoPedido);

        // 5. Salvar o Pedido (os itens serão salvos em cascata)
        Pedido pedidoSalvo = pedidoRepository.save(novoPedido);

        // 6. Limpar o carrinho (implemente este método)
        // carrinhoService.limparCarrinho(carrinho.getId());

        return pedidoSalvo;
    }


    public List<Pedido> findAll() {
        return pedidoRepository.findAll();
    }

    public Optional<Pedido> findById(Long id) {
        return pedidoRepository.findById(id);
    }

    public List<Pedido> findByClienteId(Long clienteId) {
        return pedidoRepository.findByClienteId(clienteId);
    }

    public Pedido save(Pedido pedido) {
        return pedidoRepository.save(pedido);
    }

    public Pedido update(Long id, Pedido pedidoAtualizado) {
        return pedidoRepository.findById(id).map(pedido -> {
            pedido.setStatus(pedidoAtualizado.getStatus());
            pedido.setValorTotal(pedidoAtualizado.getValorTotal());
            pedido.setCliente(pedidoAtualizado.getCliente());
            pedido.setEndereco(pedidoAtualizado.getEndereco());
            pedido.setDataPedido(pedidoAtualizado.getDataPedido());
            return pedidoRepository.save(pedido);
        }).orElseThrow(() -> new RuntimeException("Pedido não encontrado com ID: " + id));
    }

    public void delete(Long id) {
        pedidoRepository.deleteById(id);
    }
}

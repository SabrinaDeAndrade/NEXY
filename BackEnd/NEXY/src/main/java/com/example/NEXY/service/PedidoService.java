package com.example.NEXY.service;

import com.example.NEXY.model.*;
import com.example.NEXY.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
    private final ProdutoRepository produtoRepository;

    public PedidoService(PedidoRepository pedidoRepository, CarrinhoRepository carrinhoRepository, ClienteRepository clienteRepository, EnderecoRepository enderecoRepository, ProdutoRepository produtoRepository) {
        this.pedidoRepository = pedidoRepository;
        this.carrinhoRepository = carrinhoRepository;
        this.clienteRepository = clienteRepository;
        this.enderecoRepository = enderecoRepository;
        this.produtoRepository = produtoRepository;
    }

    @Transactional
    public Pedido finalizarCompra(Long clienteId, Long enderecoId, String cartaoToken) {
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

        Pedido novoPedido = new Pedido();
        novoPedido.setCliente(cliente);
        novoPedido.setEndereco(endereco);
        novoPedido.setDataPedido(LocalDateTime.now());
        novoPedido.setStatus(StatusPedido.PROCESSANDO);
        novoPedido.setValorTotal(carrinho.getValorTotal());


        List<PedidoItem> itensDoPedido = new ArrayList<>();
        for (CarrinhoItem itemCarrinho : carrinho.getItens()) {
            Produto produto = itemCarrinho.getProduto();

            if (produto.getEstoque() < itemCarrinho.getQuantidade()) {
                throw new RuntimeException("Estoque insuficiente para o produto: " + produto.getNome());
            }
            produto.setEstoque(produto.getEstoque() - itemCarrinho.getQuantidade());

            produtoRepository.save(produto);

            PedidoItem itemPedido = new PedidoItem();
            itemPedido.setPedido(novoPedido);
            itemPedido.setProduto(itemCarrinho.getProduto());
            itemPedido.setQuantidade(itemCarrinho.getQuantidade());
            itemPedido.setPrecoUnitario(itemCarrinho.getPrecoUnitario());
            itensDoPedido.add(itemPedido);
        }
        novoPedido.setItens(itensDoPedido);

        Pedido pedidoSalvo = pedidoRepository.save(novoPedido);

        carrinho.getItens().clear();
        carrinho.setValorTotal(0.0);
        carrinhoRepository.save(carrinho);

        return pedidoSalvo;
    }


    public List<Pedido> listarTodosOrdenados() {
        return pedidoRepository.findAllByOrderByDataPedidoDesc();
    }

    public Pedido atualizarStatus(Long pedidoId, StatusPedido novoStatus) {
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado com id: " + pedidoId));


         if (novoStatus == StatusPedido.PROCESSANDO && pedido.getStatus() == StatusPedido.ENVIADO) {
         throw new RuntimeException("Não é possível voltar o status de ENVIADO para PROCESSANDO.");
         }

        pedido.setStatus(novoStatus);
        return pedidoRepository.save(pedido);
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

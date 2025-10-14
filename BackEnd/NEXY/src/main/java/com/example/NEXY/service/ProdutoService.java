package com.example.NEXY.service;

import com.example.NEXY.model.Produto;
import com.example.NEXY.repository.ProdutoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProdutoService {
    private final ProdutoRepository produtoRepository;
    private final CategoriaService categoriaService;

    private static final String UPLOAD_DIR = "uploads/";

    public ProdutoService(ProdutoRepository produtoRepository, CategoriaService categoriaService) {
        this.produtoRepository = produtoRepository;
        this.categoriaService = categoriaService;
    }


    @Transactional
    public Produto save(Produto produto) {
        if (produto.getId() == null || produto.getId() == 0) {
            // Produto novo
            return produtoRepository.save(produto);
        } else {
            // Atualização de produto existente
            Optional<Produto> produtoExistenteOpt = produtoRepository.findById(produto.getId());
            if (produtoExistenteOpt.isEmpty()) {
                throw new RuntimeException("Produto não encontrado com id " + produto.getId());
            }

            Produto produtoExistente = produtoExistenteOpt.get();
            produtoExistente.setNome(produto.getNome());
            produtoExistente.setDescricao(produto.getDescricao());
            produtoExistente.setPreco(produto.getPreco());
            produtoExistente.setEstoque(produto.getEstoque());
            produtoExistente.setPeso(produto.getPeso());
            produtoExistente.setAltura(produto.getAltura());
            produtoExistente.setLargura(produto.getLargura());
            produtoExistente.setCategoria(produto.getCategoria());
            produtoExistente.setImagemUrl(produto.getImagemUrl());

            return produtoRepository.save(produtoExistente);
        }
    }

    @Transactional
    public Produto findById(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado com id " + id));
    }


    public List<Produto> findAll() {
        return produtoRepository.findAll();
    }



    public void delete(Long id) {
        produtoRepository.deleteById(id);
    }

    @Transactional
    public String salvarImagem(Long id, MultipartFile imagem) throws IOException {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado com ID: " + id));

        try {
            // Cria pasta se não existir
            File diretorio = new File(UPLOAD_DIR);
            if (!diretorio.exists()) {
                diretorio.mkdirs();
            }

            // Gera nome único para a imagem
            String nomeArquivo = UUID.randomUUID() + "_" + imagem.getOriginalFilename();

            // Caminho completo para salvar
            Path caminhoArquivo = Paths.get(UPLOAD_DIR + nomeArquivo);

            // Salva o arquivo fisicamente
            Files.write(caminhoArquivo, imagem.getBytes());

            // Atualiza o produto com a URL da imagem (pode ser um caminho relativo)
            produto.setImagemUrl("/uploads/" + nomeArquivo);
            produtoRepository.save(produto);

            return produto.getImagemUrl();

        } catch (IOException e) {
            throw new RuntimeException("Erro ao salvar imagem: " + e.getMessage());
        }
    }

    public List<Produto> getProductsByCategoryId(Long categoriaId) {
        return produtoRepository.findByCategoriaId(categoriaId);

    }
}

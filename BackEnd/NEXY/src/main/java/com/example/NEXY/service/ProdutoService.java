package com.example.NEXY.service;

import com.example.NEXY.model.Produto;
import com.example.NEXY.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
@Service
public class ProdutoService {
    private final ProdutoRepository produtoRepository;
    private final CategoriaService categoriaService;

    public ProdutoService(ProdutoRepository produtoRepository, CategoriaService categoriaService) {
        this.produtoRepository = produtoRepository;
        this.categoriaService = categoriaService;
    }


    public Produto save(Produto produto) {

        if (produto.getCategoria() != null && produto.getCategoria().getId() != null) {
            produto.setCategoria(
                    categoriaService.findById(produto.getCategoria().getId())
            );
        }
        return produtoRepository.save(produto);
    }

    public Produto findById(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado!"));
    }

    public List<Produto> findAll() {
        return produtoRepository.findAll();
    }

    public Produto update(Long id, Produto produtoAtualizado) {
        Produto produto = findById(id);
        produto.setNome(produtoAtualizado.getNome());
        produto.setDescricao(produtoAtualizado.getDescricao());
        produto.setPreco(produtoAtualizado.getPreco());
        produto.setEstoque(produtoAtualizado.getEstoque());
        produto.setPeso(produtoAtualizado.getPeso());
        produto.setAltura(produtoAtualizado.getAltura());
        produto.setLargura(produtoAtualizado.getLargura());

        if (produtoAtualizado.getCategoria() != null && produtoAtualizado.getCategoria().getId() != null) {
            produto.setCategoria(
                    categoriaService.findById(produtoAtualizado.getCategoria().getId())
            );
        }
        return produtoRepository.save(produto);
    }

    public void delete(Long id) {
        produtoRepository.deleteById(id);
    }

    public String salvarImagem(Long id, MultipartFile imagem) throws IOException {
        Produto produto = findById(id);

        if (imagem.isEmpty()) {
            throw new RuntimeException("Arquivo não enviado!");
        }

        // Diretório de upload
        String pastaUpload = "uploads/";
        File diretorio = new File(pastaUpload);
        if (!diretorio.exists()) {
            diretorio.mkdirs();
        }

        // Gera nome único
        String nomeArquivo = System.currentTimeMillis() + "_" + imagem.getOriginalFilename();
        Path caminhoArquivo = Paths.get(pastaUpload + nomeArquivo);

        // Salva arquivo
        Files.write(caminhoArquivo, imagem.getBytes());

        // Atualiza URL no produto
        String urlImagem = "http://localhost:8080/uploads/" + nomeArquivo;
        produto.setImagemUrl(urlImagem);
        produtoRepository.save(produto);

        return urlImagem;
    }
}

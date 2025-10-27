package com.example.NEXY.service;

import com.example.NEXY.model.Categoria;
import com.example.NEXY.model.ImagemProduto;
import com.example.NEXY.model.Produto;
import com.example.NEXY.repository.CategoriaRepository;
import com.example.NEXY.repository.ImagemProdutoRepository;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    private final ImagemProdutoRepository imagemProdutoRepository;
    private final CategoriaRepository categoriaRepository;

    public ProdutoService(ProdutoRepository produtoRepository,
                          ImagemProdutoRepository imagemProdutoRepository,
                          CategoriaRepository categoriaRepository) {
        this.produtoRepository = produtoRepository;
        this.imagemProdutoRepository = imagemProdutoRepository;
        this.categoriaRepository = categoriaRepository;
    }

    @Transactional
    public Produto save(Produto produto) {
        Long categoriaId = produto.getCategoria().getId();
        Categoria categoriaReal = categoriaRepository.findById(categoriaId)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada com id " + categoriaId));

        if (produto.getId() == null || produto.getId() == 0) {

            produto.setCategoria(categoriaReal);
            return produtoRepository.save(produto);

        } else {
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
            produtoExistente.setCategoria(categoriaReal);
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

    public List<String> salvarImagens(Long id, List<MultipartFile> imagens) throws IOException {
        Produto produto = this.findById(id);

        List<String> urls = new ArrayList<>();
        String pastaUpload = "uploads/";
        File diretorio = new File(pastaUpload);
        if (!diretorio.exists()) {
            diretorio.mkdirs();
        }

        for (MultipartFile imagem : imagens) {
            if (imagem.isEmpty()) {
                continue;
            }

            String nomeArquivo = System.currentTimeMillis() + "_" + imagem.getOriginalFilename();
            Path caminhoArquivo = Paths.get(pastaUpload + nomeArquivo);
            Files.write(caminhoArquivo, imagem.getBytes());

            ImagemProduto novaImagem = new ImagemProduto();
            String urlImagem = "/uploads/" + nomeArquivo;
            novaImagem.setUrl(urlImagem);
            novaImagem.setProduto(produto);

            if (produto.getImagens() == null) {
                produto.setImagens(new ArrayList<>());
            }
            produto.getImagens().add(novaImagem);
            urls.add(urlImagem);
        }

        produtoRepository.save(produto);
        return urls;
    }

    public List<Produto> getProductsByCategoryId(Long categoriaId) {
        return produtoRepository.findByCategoriaId(categoriaId);
    }

    @Transactional
    public void deleteImagem(Long imagemId) throws IOException {

        ImagemProduto imagem = imagemProdutoRepository.findById(imagemId)
                .orElseThrow(() -> new RuntimeException("Imagem não encontrada com id " + imagemId));

        String caminhoArquivoStr = imagem.getUrl().substring(1);


        Path caminhoArquivo = Paths.get(caminhoArquivoStr);


        try {
            // Usa a variável que acabamos de definir
            Files.deleteIfExists(caminhoArquivo);

        } catch (IOException e) {
            // Loga o erro, mas continua para deletar do banco
            System.err.println("Falha ao deletar arquivo do disco: " + caminhoArquivoStr);
            e.printStackTrace();
        }


        Produto produto = imagem.getProduto();
        if (produto != null && produto.getImagens() != null) {
            produto.getImagens().remove(imagem);
        }

        // 5. Deleta a imagem do banco de dados
        imagemProdutoRepository.delete(imagem);
    }
}


import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sobre.html',
  styleUrl: './sobre.css'
})
export class Sobre {
  teamMembers = [
    {
      name: "Maria Mazotti",
      role: "CEO & Fundadora",
      photo: "/img/maria.png",
    },
    {
      name: "Sabrina Andrade",
      role: "Diretora Criativa",
      photo: "/img/sabrina.png",
    },
    {
      name: "Ana Coutinho",
      role: "Gerente de Operações",
      photo: "/img/ana.png",
    },
    {
      name: "Jaine Rosa",
      role: "Gerente de Operações",
      photo: "/img/jaine.png",
    },
    {
      name: "Ruthe Cecília",
      role: "Gerente de Operações",
      photo: "/img/ruthe.png",
    },
  ]

  values = [
    {
      icon: "✨",
      title: "Qualidade",
      description: "Cada produto representa o compromisso da Nexy com excelência.",
    },
    {
      icon: "🌐",
      title: "Conexão",
      description: "Tecnologia é sobre aproximar pessoas e é isso que nos move.",
    },
    {
      icon: "🤝",
      title: "Humanidade",
      description: "Mesmo em um mundo digital, nunca esquecemos que tudo começa com pessoas.",
    },
    {
      icon: "🌟",
      title: "Inovação",
      description: "Buscamos sempre o novo, o diferente e o melhor.",
    },
  ]
}

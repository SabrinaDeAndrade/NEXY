// Contador do carrinho
let cartCount = 0

function updateCartCount() {
  const cartCountElement = document.getElementById("cartCount")
  if (cartCountElement) {
    cartCountElement.textContent = cartCount
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const cartBtn = document.getElementById("cartBtn")

  if (cartBtn) {
    cartBtn.addEventListener("click", (e) => {
      e.preventDefault()
      alert("Carrinho de compras - Funcionalidade a ser implementada")
    })
  }

  updateCartCount()
})

function addToCart() {
  cartCount++
  updateCartCount()
}

function removeFromCart() {
  if (cartCount > 0) {
    cartCount--
    updateCartCount()
  }
}

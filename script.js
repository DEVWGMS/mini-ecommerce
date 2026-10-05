const data = {
    produtos: [
        {
            id: 1,
            nome: "Galaxy A55",
            preco: 1899.90,
            categoria: "Celulares",
            imagem: "https://placehold.co/300x200?text=Galaxy+A55",
            descricao: "Smartphone com tela de alta qualidade e bom desempenho.",
            emEstoque: true
        },
        {
            id: 2,
            nome: "Poco C75",
            preco: 899.90,
            categoria: "Celulares",
            imagem: "https://placehold.co/300x200?text=Poco+C75",
            descricao: "Smartphone com boa bateria e ótimo custo-benefício.",
            emEstoque: true
        },
        {
            id: 3,
            nome: "ThinkPad E480",
            preco: 1899.90,
            categoria: "Notebooks",
            imagem: "https://placehold.co/300x200?text=ThinkPad+E480",
            descricao: "Notebook para estudos, programação e trabalho.",
            emEstoque: true
        },
        {
            id: 4,
            nome: "Notebook Gamer",
            preco: 4299.90,
            categoria: "Notebooks",
            imagem: "https://placehold.co/300x200?text=Notebook+Gamer",
            descricao: "Notebook com alto desempenho para jogos e aplicações pesadas.",
            emEstoque: false
        },
        {
            id: 5,
            nome: "Teclado Mecânico",
            preco: 249.90,
            categoria: "Acessórios",
            imagem: "https://placehold.co/300x200?text=Teclado",
            descricao: "Teclado mecânico compacto para jogos e programação.",
            emEstoque: true
        },
        {
            id: 6,
            nome: "Mouse Gamer",
            preco: 149.90,
            categoria: "Acessórios",
            imagem: "https://placehold.co/300x200?text=Mouse",
            descricao: "Mouse gamer com sensor de alta precisão.",
            emEstoque: true
        },
        {
            id: 7,
            nome: "Controle Bluetooth",
            preco: 199.90,
            categoria: "Games",
            imagem: "https://placehold.co/300x200?text=Controle",
            descricao: "Controle sem fio compatível com computador e dispositivos móveis.",
            emEstoque: true
        },
        {
            id: 8,
            nome: "Headset Gamer",
            preco: 299.90,
            categoria: "Games",
            imagem: "https://placehold.co/300x200?text=Headset",
            descricao: "Headset com microfone integrado e áudio estéreo.",
            emEstoque: false
        }
    ]
};


// Seleção dos elementos do HTML
const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");

const renderButton = document.getElementById("btnRender");


// Formata o preço para Real brasileiro
function formatPrice(preco) {

    return preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


// Cria o card de um produto
function createProductCard(produto) {

    const card = document.createElement("div");

    card.setAttribute("data-id", produto.id);

    card.classList.add("card");

    card.style.padding = "15px";


    // Imagem
    const image = document.createElement("img");

    image.src = produto.imagem;

    image.alt = produto.nome;


    // Nome
    const title = document.createElement("h3");

    title.textContent = produto.nome;

    title.classList.add("card-title");


    // Preço
    const price = document.createElement("p");

    price.textContent = formatPrice(produto.preco);

    price.classList.add("card-price");


    // Categoria
    const category = document.createElement("p");

    category.textContent = "Categoria: " + produto.categoria;


    // Botão Ver detalhes
    const detailsButton = document.createElement("button");

    detailsButton.textContent = "Ver detalhes";

    detailsButton.classList.add("btn-details");


    detailsButton.addEventListener("click", function () {

        showProductDetails(produto);

    });


    // Botão Destacar
    const highlightButton = document.createElement("button");

    highlightButton.textContent = "Destacar";

    highlightButton.classList.add("btn-highlight");


    highlightButton.addEventListener("click", function () {

        card.classList.toggle("highlight");

    });


    // Adiciona os elementos dentro do card
    card.appendChild(image);

    card.appendChild(title);

    card.appendChild(price);

    card.appendChild(category);

    card.appendChild(detailsButton);

    card.appendChild(highlightButton);


    return card;

}


// Renderiza os produtos na tela
function renderProducts(produtos) {

    productList.innerHTML = "";


    produtos.forEach(function (produto) {

        const card = createProductCard(produto);

        productList.appendChild(card);

    });


    // Seleciona todos os cards criados
    const cards = document.querySelectorAll(".card");


    // Mostra os IDs no Console
    cards.forEach(function (card) {

        console.log(
            "Produto carregado:",
            card.getAttribute("data-id")
        );

    });

}


// Preenche o select com as categorias
function renderCategories() {

    categorySelect.innerHTML = "";


    // Adiciona a opção Todas
    const todasOption = document.createElement("option");

    todasOption.value = "Todas";

    todasOption.textContent = "Todas";

    categorySelect.appendChild(todasOption);


    // Array para armazenar categorias
    const categorias = [];


    // Percorre os produtos
    data.produtos.forEach(function (produto) {

        if (!categorias.includes(produto.categoria)) {

            categorias.push(produto.categoria);

        }

    });


    // Cria as opções do select
    categorias.forEach(function (categoria) {

        const option = document.createElement("option");

        option.value = categoria;

        option.textContent = categoria;

        categorySelect.appendChild(option);

    });

}


// Mostra os detalhes de um produto
function showProductDetails(produto) {

    productDetails.innerHTML = `
        <h3>${produto.nome}</h3>

        <p>
            <strong>Preço:</strong>
            ${formatPrice(produto.preco)}
        </p>

        <p>
            <strong>Categoria:</strong>
            ${produto.categoria}
        </p>

        <p>
            <strong>Estoque:</strong>
            ${produto.emEstoque ? "Disponível" : "Fora de estoque"}
        </p>

        <p>
            <strong>Descrição:</strong>
            ${produto.descricao}
        </p>
    `;

}


// Filtra os produtos
function filterProducts() {

    const texto = searchInput.value.toLowerCase();

    const categoria = categorySelect.value;


    const produtosFiltrados = data.produtos.filter(function (produto) {

        const correspondeTexto =
            produto.nome.toLowerCase().includes(texto);


        const correspondeCategoria =
            categoria === "Todas" ||
            produto.categoria === categoria;


        return correspondeTexto && correspondeCategoria;

    });


    return produtosFiltrados;

}


// Evento de digitação no campo de busca
searchInput.addEventListener("input", function () {

    const produtos = filterProducts();

    renderProducts(produtos);

});


// Evento de mudança de categoria
categorySelect.addEventListener("change", function () {

    const produtos = filterProducts();

    renderProducts(produtos);

});


// Evento do botão Renderizar
renderButton.addEventListener("click", function () {

    const produtos = filterProducts();

    renderProducts(produtos);

});


// Inicializa as categorias
renderCategories();


// Renderiza todos os produtos inicialmente
renderProducts(data.produtos);
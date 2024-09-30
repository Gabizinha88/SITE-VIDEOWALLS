// Adiciona um evento de submit ao formulário
document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();
   
    // Obtém os valores dos campos do formulário
    const title = document.getElementById('title').value;
    const images = document.getElementById('image').files;
    const content = document.getElementById('content').value;
 
    // Obtém os posts do localStorage ou inicializa um array vazio
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
 
    // Converte as imagens para base64 e adiciona ao array de posts
    const imagePromises = Array.from(images).map(image => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                resolve(e.target.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(image);
        });
    });
 
    Promise.all(imagePromises).then(base64Images => {
        base64Images.forEach(base64Image => {
            const post = {
                title: title,
                image: base64Image,
                content: content
            };
            posts.push(post);
        });
        localStorage.setItem('posts', JSON.stringify(posts));
 
        // Exibe uma mensagem de sucesso e atualiza a lista de posts
        alert('Posts salvos com sucesso!');
        displayPosts();
 
        // Limpa os campos do formulário
        document.getElementById('postForm').reset();
    }).catch(error => {
        console.error('Erro ao converter imagens:', error);
    });
});
 
// Função para exibir os posts
function displayPosts() {
    const postList = document.getElementById('postList');
    postList.innerHTML = '';
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
 
    // Cria elementos de lista para cada post
    posts.forEach((post, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${post.title}</strong>
            <button class="delete" onclick="deletePost(${index})">Apagar</button>
            <button class="edit" onclick="editPost(${index})">Editar</button>
        `;
        postList.appendChild(li);
    });
}
 
// Função para abrir o modal de edição e preencher os campos
function editPost(index) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts[index];
 
    // Preenche os campos do modal com os dados do post
    document.getElementById('editTitle').value = post.title;
    document.getElementById('editContent').value = post.content;
    // Exibe o modal
    document.getElementById('editModal').style.display = 'block';
 
    // Adiciona um listener ao formulário para salvar a edição
    document.getElementById('editForm').onsubmit = function(event) {
        event.preventDefault();
 
        // Atualiza os dados do post com os novos valores
        posts[index].title = document.getElementById('editTitle').value;
        posts[index].content = document.getElementById('editContent').value;
       
        // Se houver nova imagem, atualiza
        const editImage = document.getElementById('editImage').files;
        if (editImage.length > 0) {
            const reader = new FileReader();
            reader.onload = function(e) {
                posts[index].image = e.target.result;
                localStorage.setItem('posts', JSON.stringify(posts));
                displayPosts();
                closeEditModal(); // Fecha o modal
            };
            reader.readAsDataURL(editImage[0]);
        } else {
            // Salva sem alterar a imagem
            localStorage.setItem('posts', JSON.stringify(posts));
            displayPosts();
            closeEditModal(); // Fecha o modal
        }
    };
}
 
// Função para fechar o modal de edição
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

// Função para apagar um post
function deletePost(index) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    displayPosts();
}
 
// Alterna entre modo claro e escuro
document.getElementById('toggleMode').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    this.textContent = document.body.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Escuro';
});



// Exibe os posts ao carregar a página
displayPosts();
 
 
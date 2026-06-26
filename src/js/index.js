document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form-group');
    const textArea = document.getElementById('description');
    const htmlCode = document.getElementById('html-code');
    const cssCode = document.getElementById('css-code');
    const preview = document.getElementById('preview-section');

    document.addEventListener('submit', async (e) =>{
        e.preventDefault();

        const description = textArea.value.trim();

        if(!description){
            return;
        }
        setLoading(true);

        try {
            const response = await fetch('https://vifivo9321.app.n8n.cloud/webhook/gerador-fundo',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ description })
            });
            const data = await response.json();
            console.log(data);

            htmlCode.textContent = data[0].code;
            cssCode.textContent = data[0].style;

            preview.style.display = 'block';
            preview.innerHTML = data[0].preview;

            let styleTag = document.getElementById('dynamic-style');
            if (styleTag) styleTag.remove();

            if(data[0].style){
                styleTag = document.createElement('style');
                styleTag.id = 'dynamic-style';
                styleTag.textContent = data[0].style;
                document.head.appendChild(styleTag);
            }

            
        } catch (error) {
            console.error('Erro ao gerar o fundo:', error);
            htmlCode.textContent = 'Não consegui gerar o código HTML. Por favor, tente novamente.';
            cssCode.textContent = 'Não consegui gerar o código CSS. Por favor, tente novamente.';
            preview.innerHTML = '';
        }finally{
            setLoading(false);
        }
    });
});

function setLoading(isLoading) {
    const btnSpan = document.getElementById('btn-text');
    if (isLoading) {
        btnSpan.textContent = 'Gerando Background...';
    }else{
        btnSpan.textContent = 'Gerar Background Mágico';
    }
}
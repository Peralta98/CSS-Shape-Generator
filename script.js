document.addEventListener('DOMContentLoaded', function() {
    const figure = document.getElementById('figure');
    const colorPicker = document.getElementById('colorPicker');
    const borderRadiusRange = document.getElementById('borderRadiusRange');
    const sizeRange = document.getElementById('sizeRange');
    const widthRange = document.getElementById('widthRange');
    const heightRange = document.getElementById('heightRange');
    const aspectRatioFields = document.getElementById('aspectRatioFields');
    const maintainAspectRatioCheckbox = document.getElementById('maintainAspectRatioCheckbox');
    const sizeValueElement = document.getElementById('sizeValue');
    const borderRadiusValueElement = document.getElementById('borderRadiusValue');
    const widthValueElement = document.getElementById('widthValue');
    const heightValueElement = document.getElementById('heightValue');
    const generateCSSButton = document.getElementById('generateCSS');
    const cssCodeElement = document.getElementById('cssCode');
    const messageCode = document.getElementById('message');
    const shapes = document.querySelectorAll('.shape');


   // let width = 50;
    //let height = 50;
   // let aspectRatio = true;



   const shapeSVGs = document.querySelectorAll('.shape');

   shapeSVGs.forEach(svg => {
       svg.addEventListener('click', function(event) {
           const selectedShape = event.currentTarget.id;
           changeShape(selectedShape);
       });
   });
   
   // Remova os eventos dos radio buttons (caso existam)
   const shapeRadios = document.querySelectorAll('input[name="shape"]');
   shapeRadios.forEach(radio => {
       radio.removeEventListener('change', changeShape);
   });
   
   
       function changeShape(selectedShape) {
           switch (selectedShape) {
               case 'square':
                   figure.style.clipPath = 'none';
                   figure.style.transform = 'none';
                   borderRadiusRange.disabled = false;
                   applyBorderRadius();
                   break;
               case 'triangle':
                   figure.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
                   figure.style.transform = 'none';
                   figure.style.borderRadius = '0'; 
                   borderRadiusRange.disabled = true;
                   break;
               case 'star':
                   figure.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 72%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
                   figure.style.transform = 'none';
                   borderRadiusRange.disabled = true;
                   break;
               case 'circle':
                   figure.style.borderRadius = '50%';
                   figure.style.clipPath = 'none';
                   figure.style.transform = 'none';
                   borderRadiusRange.disabled = true;
                   break;
               default:
                   break;
           }
       }


    shapes.forEach(shape => {
        shape.addEventListener('click', function() {
            // Remove a classe 'active-shape' de todas as formas
            shapes.forEach(s => s.classList.remove('active-shape'));
          // Adiciona a classe 'active-shape' apenas à forma clicada
            this.classList.add('active-shape');
        });
    });

        colorPicker.addEventListener('input', function() {
              figure.style.backgroundColor = colorPicker.value;
    });


    sizeRange.addEventListener('input', function() {
        if (maintainAspectRatioCheckbox.checked) {
            width = sizeRange.value;
            height = sizeRange.value;
            heightRange.value = height;
            figure.style.width = width + 'px';
            figure.style.height = height + 'px'; 
        } else {
            width = sizeRange.value;
            figure.style.width = width + 'px';
        }
        sizeValueElement.textContent = sizeRange.value;

        widthRange.value = sizeRange.value;
        heightRange.value = sizeRange.value;
        widthValueElement.textContent = sizeRange.value;
        heightValueElement.textContent = sizeRange.value;

    });

    widthRange.addEventListener('input', function() {
        width = widthRange.value;
        figure.style.width = width + 'px';
        widthValueElement.textContent = widthRange.value;
    });
    

    heightRange.addEventListener('input', function() {
        height = heightRange.value;
        figure.style.height = height + 'px';
        heightValueElement.textContent = heightRange.value; 
    });

    maintainAspectRatioCheckbox.addEventListener('change', function() {
        aspectRatio = maintainAspectRatioCheckbox.checked;
        if (aspectRatio) {
            aspectRatioFields.style.display = 'none';
            heightRange.value = width;
            height = width;
            figure.style.height = height + 'px';
            sizeLabel.style.display = 'block'; // Mostra a label "Tamanho"
            sizeRange.style.display = 'block'; // Mostra o input de range "Tamanho"
        } else {
            aspectRatioFields.style.display = 'block';
            sizeLabel.style.display = 'none'; // Oculta a label "Tamanho"
            sizeRange.style.display = 'none'; // Oculta o input de range "Tamanho"
        }
    });

    // Hide aspect ratio fields initially
    aspectRatioFields.style.display = 'none';
    sizeLabel.style.display = 'block'; // Mostra a label "Tamanho" por padrão
    sizeRange.style.display = 'block'; // Mostra o input de range "Tamanho" por padrão



    borderRadiusRange.addEventListener('input', function() {
        applyBorderRadius();
       borderRadiusValueElement.textContent = borderRadiusRange.value;
});

function applyBorderRadius() {
    const borderRadiusPercentage = borderRadiusRange.value;
    figure.style.borderRadius = borderRadiusPercentage + '%';
}


sizeValueElement.textContent = sizeRange.value;
borderRadiusValueElement.textContent = borderRadiusRange.value;
widthValueElement.textContent = widthRange.value;
heightValueElement.textContent = heightRange.value;





    generateCSSButton.addEventListener('click', function() {
    const activeShape = document.querySelector('.active-shape');
    let shape;

    if (activeShape) {
        shape = activeShape.id;
    } else {
        // Se nenhuma forma estiver ativa, você pode definir um valor padrão
        shape = 'square'; // ou qualquer outra forma que desejar ser a padrão
    }
       
       
       
        const borderRadius = borderRadiusRange.value;
        const color = colorPicker.value;
        let width = widthRange.value;
        let height = heightRange.value;

        if (maintainAspectRatioCheckbox.checked) {
            width = height;
            widthRange.value = width;
            widthValueElement.textContent = width;
        }
    

    const codeMessage = "Left click below to copy the code"
    const cssCode = `
            .shape {
            background-color: ${color};
            width: ${width}px;
            height: ${height}px;
            ${
                shape === 'square' ? `border-radius: ${borderRadius}%;\n` : 
                shape === 'triangle' ? `clip-path: polygon(50% 0%, 0% 100%, 100% 100%);\n` : 
                shape === 'star' ? `clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 72%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);\n` : 
                shape === 'circle' ? `border-radius: 50%;\n` : 
                ''
            }
        }
    `;

   
    cssCodeElement.innerText = cssCode;
    messageCode.innerText = codeMessage;
});



// Adiciona um evento de clique ao elemento pre
cssCodeElement.addEventListener('click', function() {
    // Seleciona o conteúdo dentro da tag pre
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(cssCodeElement);
    selection.removeAllRanges();
    selection.addRange(range);

    // Copia o conteúdo selecionado para a área de transferência
    document.execCommand('copy');

    // Remove a seleção após a cópia
    selection.removeAllRanges();
    alert('Copied!');
});


   
});

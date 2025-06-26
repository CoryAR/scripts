// By Cory and Nicket of jCodes: https://jcodesresources.com/

export default function({BBCodeGroups}){
    const clean = str => str.replace(/\*/g, '').trim().toLowerCase();

    const buttonsContainer = document.getElementById('bbcode-buttons');
    for (const BBCodeGroup of BBCodeGroups) {
        const select = Object.assign(document.createElement('select'), {
            class: 'BBCodeGroup',
            'data-name': BBCodeGroup.name,
            'class': 'forminput',
            'style': 'margin: 0 2px',
            innerHTML: `<option value="-1">${BBCodeGroup.name}</option>`
        });
        buttonsContainer.appendChild(select);

        for (const BBCodeButton of BBCodeGroup.BBCodeButtons) {
            select.appendChild(Object.assign(document.createElement('option'), {
                value: BBCodeButton,
                textContent: BBCodeButton
            }));
            const existingInput = [...buttonsContainer.getElementsByTagName('input')].find(input => clean(input.value) === clean(BBCodeButton));
            if (existingInput)
                existingInput.style.display = 'none';
        }

        select.addEventListener('change', function() {
            if (this.value === '-1')
                return;
            const BBCodeName = this.value;
            const existingInput = [...buttonsContainer.getElementsByTagName('input')].find(input => clean(input.value) === clean(BBCodeName));
            if (existingInput) {
                existingInput.click();
                select.value = '-1';
            }
        });
    }
});

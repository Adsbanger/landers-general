const wheelTextItems = [
  {
    first: '1.000.000₫',
    second: 'Thưởng'
  },
  {
    first: '300.000₫',
    second: ''
  },
  {
    first: '500.000₫',
    second: ''
  },
  {
    first: '600.000₫',
    second: ''
  },
  {
    first: 'QUAY LẠI',
    second: ''
  },
  {
    first: '750.000₫',
    second: ''
  },
  {
    first: '900.000₫',
    second: ''
  },
  {
    first: 'QUAY LẠI',
    second: ''
  }
];

const wheelTexts = document.getElementById('wheelTexts');

wheelTexts.innerHTML = wheelTextItems
  .map((item, index) => `
      <div class="wheel__texts-${index + 1} wheel__texts-block">
          <p class="wheel__texts-1-first" style="font-size: ${item.firstSize || '3em'}">
              ${item.first}
          </p>

          ${item.second ? `
              <p class="wheel__texts-1-second" style="font-size: ${item.secondSize || '2em'}">
                  ${item.second}
              </p>
          ` : ''}
      </div>
  `)
  .join('');
const wheelTextItems = [
  {
    first: '฿1,000',
    second: 'โบนัส'
  },
  {
    first: '฿300',
    second: ''
  },
  {
    first: '฿500',
    second: ''
  },
  {
    first: '฿600',
    second: ''
  },
  {
    first: 'หมุนอีกครั้ง',
    second: ''
  },
  {
    first: '฿750',
    second: ''
  },
  {
    first: '฿900',
    second: ''
  },
  {
    first: 'หมุนอีกครั้ง',
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
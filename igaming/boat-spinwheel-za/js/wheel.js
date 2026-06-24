const wheelItems = [
    { amount: 300 },
    { amount: 500 },
    { amount: 1000 },
    { amount: 1500 },
    { amount: 2000 },
    { amount: 3000, className: 'crystals' }
];

const wheelCurrency = 'R';

const wheelContainer = document.getElementById('wheelContainer');

wheelContainer.innerHTML = wheelItems
    .map(item => `
      <div class="wheel-item">
          <div class="wheel-item-inner">
              <div class="wheel-amount ${item.className || ''}">
                  ${wheelCurrency}${item.amount.toLocaleString('en-US')}
              </div>
          </div>
      </div>
  `)
    .join('');
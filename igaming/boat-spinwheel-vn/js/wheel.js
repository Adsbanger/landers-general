const wheelItems = [
    { amount: 300000 },
    { amount: 500000 },
    { amount: 600000 },
    { amount: 750000 },
    { amount: 900000 },
    { amount: 1000000, className: 'crystals' }
];

const wheelCurrency = '₫';

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
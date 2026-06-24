const wheelItems = [
  { amount: 300 },
  { amount: 500 },
  { amount: 600 },
  { amount: 750 },
  { amount: 900 },
  { amount: 1000, className: 'crystals' }
];

const wheelCurrency = '฿';

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
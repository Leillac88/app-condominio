const SUPABASE_URL = 'https://ywjmagrxcljqekcefwiw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3am1hZ3J4Y2xqcWVrY2Vmd2l3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NDU1MTMsImV4cCI6MjA2MTUyMTUxM30.rcKzNgAEqNf3i3U8oPlqcUK-fZ4WqlFhlRDnujXcjuk';

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();
  const erroEl = document.getElementById('erro');

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/usuarios?email=eq.${email}&senha=eq.${senha}`, {
      method: 'GET',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Accept: 'application/json'
      }
    });

    const data = await res.json();

    if (data.length === 0) {
      erroEl.textContent = 'Email ou senha inválidos.';
      return;
    }

    const user = data[0];
    document.getElementById('login-container').classList.add('hidden');
    renderizarCards(user);
  } catch (error) {
    erroEl.textContent = 'Erro ao conectar com o servidor.';
    console.error(error);
  }
});

function renderizarCards(user) {
    const container = document.getElementById('cards-container');
    container.classList.remove('hidden');
  
    container.innerHTML = `
      <button id="logout-btn">Sair</button>
  
      <div class="card">
        <h3>Aluguel</h3>
        <p><strong>Usuário:</strong> ${user.nome}</p>
        <p><strong>Valor:</strong> R$ ${user.valor_aluguel.toFixed(2)}</p>
        <p><strong>Status:</strong> <span class="status ${user.aluguel_pago ? 'pago' : 'pendente'}">${user.aluguel_pago ? 'Pago' : 'Pendente'}</span></p>
      </div>
  
      <div class="card">
        <h3>Condomínio</h3>
        <p><strong>Usuário:</strong> ${user.nome}</p>
        <p><strong>Valor:</strong> R$ ${user.valor_condominio.toFixed(2)}</p>
        <p><strong>Status:</strong> <span class="status ${user.condominio_pago ? 'pago' : 'pendente'}">${user.condominio_pago ? 'Pago' : 'Pendente'}</span></p>
      </div>
  
      <div class="card">
        <h3>Aluguel + Condomínio (com desconto)</h3>
        <p><strong>Usuário:</strong> ${user.nome}</p>
        <p><strong>Valor:</strong> R$ ${user.valor_com_desconto.toFixed(2)}</p>
        <p><strong>Status:</strong> <span class="status ${user.pago_com_desconto ? 'pago' : 'pendente'}">${user.pago_com_desconto ? 'Pago' : 'Pendente'}</span></p>
      </div>
    `;
  
    // Agora que o botão foi inserido, adicionamos o event listener
    document.getElementById('logout-btn').addEventListener('click', () => {
      document.getElementById('cards-container').classList.add('hidden');
      document.getElementById('login-container').classList.remove('hidden');
      document.getElementById('login-form').reset();
      document.getElementById('erro').textContent = '';
    });
  }
  
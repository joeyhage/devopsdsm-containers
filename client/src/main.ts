import './style.css'

async function checkHealth() {
  try {
    const response = await fetch('http://192.168.1.215:8000/health')
    const data = await response.json()
    return data.status === 'healthy' ? '✅' : '❌'
  } catch {
    return '❌'
  }
}

async function getVisitorCount() {
  try {
    const response = await fetch('http://192.168.1.215:8000/counter')
    const data = await response.json()
    return data.count
  } catch {
    return '?'
  }
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Development Environment Demo</h1>
    <div class="card">
      <p>Backend Status: <span id="status">Checking...</span></p>
      <p>Visitor Count: <span id="count">Loading...</span></p>
      <button type="button" id="refresh">Refresh Status</button>
    </div>
  </div>
`

async function updateStatus() {
  document.getElementById('status')!.textContent = await checkHealth()
  document.getElementById('count')!.textContent = await getVisitorCount()
}

document.getElementById('refresh')?.addEventListener('click', updateStatus)
updateStatus()

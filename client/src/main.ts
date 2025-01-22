import './style.css'

console.log(import.meta.env.MODE)

async function checkHealth() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_HOST}/health`)
    const data = await response.json()
    return data.status === 'healthy' ? '✅' : '❌'
  } catch {
    return '❌'
  }
}

async function getVisitorCount() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_HOST}/counter`)
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

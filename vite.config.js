import { appendFile, mkdir } from 'node:fs/promises'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

function contactApi(server) {
  server.middlewares.use('/api/contact', async (req, res) => {
    if (req.method !== 'POST') return res.writeHead(405).end()
    let size = 0
    const chunks = []
    try {
      for await (const chunk of req) {
        size += chunk.length
        if (size > 32768) return res.writeHead(413).end()
        chunks.push(chunk)
      }
      const { name, email, message, website } = JSON.parse(Buffer.concat(chunks).toString())
      if (![name, email, message].every(value => typeof value === 'string') ||
          name.trim().length < 2 || !/^\S+@\S+\.\S+$/.test(email.trim()) ||
          message.trim().length < 12) return res.writeHead(400).end()
      if (!website) {
        const dir = process.env.PORTFOLIO_INBOX_DIR || join(homedir(), '.sriram-portfolio')
        await mkdir(dir, { recursive: true, mode: 0o700 })
        await appendFile(join(dir, 'messages.jsonl'), JSON.stringify({ name, email, message, received: new Date() }) + '\n', { mode: 0o600 })
      }
      res.writeHead(201).end()
    } catch (error) {
      res.writeHead(error instanceof SyntaxError ? 400 : 500).end()
    }
  })
}

export default defineConfig({
  plugins: [react(), { name: 'contact-api', configureServer: contactApi, configurePreviewServer: contactApi }],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } }
})

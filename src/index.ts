import pug from 'pug'

export class PugRendererError extends Error {
  constructor (message: string) {
    super(`[Zaqar renderer error - Pug]: ${message}`)
  }
}

async function renderFunction (text: string, data: any = {}, renderer: typeof pug = pug): Promise<string> {
  try {
    return renderer.render(text, { cache: true, filename: 'zaqar-template', ...data })
  } catch (error) {
    throw new PugRendererError(error.message)
  }
}

const rendererObj = {
  name: 'pug',
  fn: renderFunction,
  errClass: PugRendererError
}

export default rendererObj
module.exports = rendererObj

const assert = require('assert')
const { describe, it } = require('mocha')
const renderer = require('../dist')


describe('exported object', () => {
  it('should be an object with name and function', () => {
    assert.ok(typeof renderer, 'object')
    assert.ok(renderer.name, 'pug')
    assert.ok(typeof renderer.fn, 'function')
  })
})

describe('pug render with no data', () => {
  const simpleTemplate = 'My simple template with no data'
  it('should render template with no errors', async () => {
    const rendered = await renderer.fn(simpleTemplate)
    assert.ok(rendered, simpleTemplate)
  })

  it('should throw an error when rendering template', async () => {
    try {
      await renderer.fn(() => { })
    } catch (error) {
      assert.deepEqual(error.message, '[Zaqar renderer error - Pug]: Invalid template! Template should be a "string" but "function" was given as the first argument for pug#render(template, view, partials)')
      assert.ok(error instanceof renderer.errClass)
    }
  })
})

describe('pug render with data', () => {
  const dataTemplate = 'My name is #{name}'
  const data = { name: 'Test' }

  it('should render template with no errors', async () => {
    const rendered = await renderer.fn(dataTemplate, data)
    assert.ok(rendered, `My name is ${data.name}`)
  })

  it('should throw an error when rendering template', async () => {
    try {
      await renderer.fn(() => { }, data)
    } catch (error) {
      assert.deepEqual(error.message, '[Zaqar renderer error - Pug]: Invalid template! Template should be a "string" but "function" was given as the first argument for pug#render(template, view, partials)')
      assert.ok(error instanceof renderer.errClass)
    }
  })
})

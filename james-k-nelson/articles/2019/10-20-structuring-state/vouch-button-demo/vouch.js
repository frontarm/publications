let vouched = {}

export default async function vouch({ id }) {
  await new Promise(resolve => setTimeout(resolve, 1000))

  if (vouched[id]) {
    throw new Error('Something went wrong')
  }

  vouched[id] = true
}
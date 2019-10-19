export default async function getUsernameAvailability(username) {
  console.log('checking if', username, 'is available')

  await new Promise(resolve => setTimeout(resolve, 500))

  return username.toLowerCase().indexOf("spartacus") === -1
}
export default async function validate(username) {
  console.log('running validation on ', username)

  await new Promise(resolve => setTimeout(resolve, 500))

  if (username.toLowerCase().indexOf("james") !== -1) {
    return "❌ That username is already taken."
  }
  else if (username) {
    return "🎉 Your username is available!"
  }
}
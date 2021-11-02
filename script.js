let seconds = 7
let minutes = 0
let minutesInt = 0
let secondsInt = 5
let cycles = 8
let cont = 1
let contclicks = 0
let minuteslongbreak = 0
let secondslongbreak = 20
let longbreaktime = 4

function start() {
  //Play notification when it starts
  document.querySelector('#notification').play()
  cont = 0 //Reset cycle counter
  contclicks++ //Click counter
  document.querySelector('#start').value = 'reset'
  //If more than one click is given on start, the time will be reset
  if (contclicks > 1) {
    clearTimeout(cron)
    seconds = 0
    minutes = 25
    minutesInt = 4
    secondsInt = 60
    timer.innerHTML = `${minutes}:0${seconds}`
  }
  //Activate the counter function every second.
  cron = setInterval(() => counter(), 1000)
}

//Time pause function
function pause() {
  clearInterval(cron)
}

//Function that will be activated each second.
function counter() {
  //Check if the number of repetitions is equal to the number of cycles
  if (cont <= cycles) {
    //If the normal time ends, break starts
    if (minutes == 0 && seconds == 00) {
      if (cont == longbreaktime) {
        longbreak()
        if (minuteslongbreak == 0 && secondslongbreak == 0) {
          document.querySelector('#notification').play()
          minutes = 0
          seconds = 7
          minutesInt = 0
          secondsInt = 5
          minuteslongbreak = 0
          secondslongbreak = 20
          cont++ //End a cycle
        }
      } else {
        shortbreak()
        //If the break ends, normal time starts
        if (minutesInt == 0 && secondsInt == 0) {
          document.querySelector('#notification').play()
          minutes = 0
          seconds = 7
          minutesInt = 0
          secondsInt = 5
          cont++ //End a cycle
        }
      }
    } else {
      //Until time runs out, normal time continues
      normaltimer()
      //When normal time runs out, alarm sounds
      if (minutes == 0 && seconds == 00) {
        document.querySelector('#notification').play()
      }
    }
  } else {
    //If the number of repetitions is equal to the number of cycles
    clearInterval(cron)
    seconds = 60
    minutes = 24
    document.querySelector('h1#header').innerHTML = 'Great Job!'
    let timer = document.querySelector('#timer')
    timer.innerHTML = 'The cycles are over'
  }
}

function normaltimer() {
  document.querySelector('h1#header').innerText = 'Stay focus!'
  let timer = document.querySelector('#timer')
  //When 60 seconds pass, add minute.
  if (seconds == 0) {
    minutes--
    seconds = 60
    //2-digit checker
    minutes < 10 ? (minutes = '0' + minutes) : (minutes = minutes)
  }
  //2-digit checker
  seconds--
  seconds < 10 ? (seconds = '0' + seconds) : (seconds = seconds)
  //Refresh the counter every second
  timer.innerHTML = `${minutes}:${seconds}`
}

function shortbreak() {
  document.querySelector('h1#header').innerText = 'Take a break'
  let timer = document.querySelector('#timer')
  //When 60 seconds pass, add minute.
  if (secondsInt == 0) {
    minutesInt--
    secondsInt = 60
    //2-digit checker
    minutesInt < 10
      ? (minutesInt = '0' + minutesInt)
      : (minutesInt = minutesInt)
  }
  //2-digit checker
  secondsInt--
  secondsInt < 10 ? (secondsInt = '0' + secondsInt) : (secondsInt = secondsInt)
  //Refresh the counter every second
  timer.innerHTML = `${minutesInt}:${secondsInt}`
}

function longbreak() {
  document.querySelector('h1#header').innerText = 'Take a long break'
  let timer = document.querySelector('#timer')
  //When 60 seconds pass, add minute.
  if (secondslongbreak == 0) {
    minuteslongbreak--
    secondslongbreak = 60
    //2-digit checker
    minuteslongbreak < 10
      ? (minuteslongbreak = '0' + minuteslongbreak)
      : (minuteslongbreak = minuteslongbreak)
  }
  //2-digit checker
  secondslongbreak--
  secondslongbreak < 10
    ? (secondslongbreak = '0' + secondslongbreak)
    : (secondslongbreak = secondslongbreak)
  //Refresh the counter every second
  timer.innerHTML = `${minuteslongbreak}:${secondslongbreak}`
}

let seconds = 0
let minutes = 25
let minutesInt = 5
let secondsInt = 0
let minuteslongbreak = 14
let secondslongbreak = 60
let longbreaktime = 4
let cycles = 8
let cont = 1
let circuloAnimado = document.querySelector(".circulo-animado")
let inicial = "440"

function start() {
  //Play notification when it starts
  document.querySelector('#notification').play()
  document.querySelector('#start').setAttribute('disabled', 'disabled')
  cont = 0 //Reset cycle counter
  //Activate the counter function every second.
  cron = setInterval(() => counter(), 1000)
}

function reset() {
  clearTimeout(cron)
  inicial = "440"
  seconds = 0
  minutes = 25
  minutesInt = 4
  secondsInt = 60
  minuteslongbreak = 14
  secondslongbreak = 60
  timer.innerHTML = `${minutes}:0${seconds}`
  document.querySelector('#start').removeAttribute('disabled', 'disabled')
}

//Time pause function
function pause() {
  clearInterval(cron)
  document.querySelector('#start').removeAttribute('disabled', 'disabled')
}

//Function that will be activated each second.
function counter() {
  //Check if the number of repetitions is equal to the number of cycles
  if (cont <= cycles) {
    //If the normal time ends, break starts
    if (minutes == 0 && seconds == 0) {
      
      if (cont == longbreaktime) {
        longbreak()
        if (minuteslongbreak == 0 && secondslongbreak == 0) {
          document.querySelector('#notification').play()
          inicial = "440"
          seconds = 60
          minutes = 24
          minuteslongbreak = 14
          secondslongbreak = 60
          cont++ //End a cycle
        }
      } else {
        shortbreak()
        //If the break ends, normal time starts
        if (minutesInt == 0 && secondsInt == 0) {
          inicial = "440"
          document.querySelector('#notification').play()
          seconds = 60
          minutes = 24
          minutesInt = 4
          secondsInt = 60
          cont++ //End a cycle
        }
      }
    } else {
      //Until time runs out, normal time continues
      normaltimer()
      if (minutes == 0 && seconds == 0) {
        inicial = "440"
        document.querySelector('#notification').play()
      }
    }
  } else {
    //If the number of repetitions is equal to the number of cycles
    clearInterval(cron)
    document.querySelector('#text').innerHTML = 'Great Job!'

    document.querySelector('#timer').innerHTML = 'The cycles are over'
  }
}

function normaltimer() {

  document.querySelector(".circulo-animado").style.strokeDashoffset = inicial-(inicial/(minutes*60+seconds))
  inicial = inicial-(inicial/(minutes*60+seconds))

  document.querySelector('#text').innerText = 'Focus time!'

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
  document.querySelector('#timer').innerHTML = `${minutes}:${seconds}`
}

function shortbreak() {
  document.querySelector(".circulo-animado").style.strokeDashoffset = inicial-(inicial/(minutesInt*60+secondsInt))
  inicial = inicial-(inicial/(minutesInt*60+secondsInt))
  document.querySelector('#text').innerText = 'Break Time'
  //When 60 seconds pass, add minute.
  if (secondsInt == 0) {
    minutesInt--
    secondsInt = 60
    //2-digit checker
    minutesInt < 10 ? (minutesInt = '0' + minutesInt) : (minutesInt = minutesInt)
  }
  //2-digit checker
  secondsInt--
  secondsInt < 10 ? (secondsInt = '0' + secondsInt) : (secondsInt = secondsInt)
  //Refresh the counter every second
  document.querySelector('#timer').innerHTML = `${minutesInt}:${secondsInt}`
}

function longbreak() {
  document.querySelector(".circulo-animado").style.strokeDashoffset = inicial-(inicial/(minuteslongbreak*60+secondslongbreak))
  inicial = inicial-(inicial/(minuteslongbreak*60+secondslongbreak))
  document.querySelector('#text').innerText = 'Long break Time'
  //When 60 seconds pass, add minute.
  if (secondslongbreak == 0) {
    minuteslongbreak--
    secondslongbreak = 60
    //2-digit checker
    minuteslongbreak < 10 ? (minuteslongbreak = '0' + minuteslongbreak) : (minuteslongbreak = minuteslongbreak)
  }
  //2-digit checker
  secondslongbreak--
  secondslongbreak < 10 ? (secondslongbreak = '0' + secondslongbreak) : (secondslongbreak = secondslongbreak)
  //Refresh the counter every second
  document.querySelector('#timer').innerHTML = `${minuteslongbreak}:${secondslongbreak}`
}

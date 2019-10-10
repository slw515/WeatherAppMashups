var canvas;
var rain = [];
var clouds = [];
var darkClouds = [];
var snow = [];
var isRaining = false;
var isClouds = false;
var isClear = true;
var isThunder = false;
var isNight = false;
var mountColor = 150;
var noiseScale1 = 0.015;
var noiseScale2 = 0.02;
var noiseScale3 = 0.03;
var redColor = 0;
var greenColor = 128;
var blueColor = 76;
var pastureGreen;
var range1 = 120;
var range2 = 65;
var range3 = 80;
var windSpeed, thunderSound, rainSound;
var mappedTwelveHourTime;
var mappedMoonPosition, mappedSunPosition;
var randomizer1;
var randomizer2;
var randomizer3;
var hoursInHundred;
var greenReducer = 150;
var color1, color2;
var isSunsetAndClear = false;
var sunsetHills;
let revealerCount = 0;

//p5 shit
function windowResized() {
  //console.log('resized');
  resizeCanvas(windowWidth, windowHeight);
}

function preload() {
  thunderSound = loadSound("thunder.mp3");
  rainSound = loadSound("rain.mp3");
}

function setup() {
  randomizer3 = random(-20, 20);
  randomizer2 = random(-20, 20);
  randomizer1 = random(-20, 20);
  color2 = color(204, 51, 0);
  color1 = color(0, 0, 153);

  pastureGreen = color(redColor, greenColor, blueColor);
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
  for (i = 0; i < 600; i++) {
    rain[i] = new Rain(random(0, windowWidth), random(0, -900));
  }
  for (i = 0; i < 600; i++) {
    snow[i] = new Snow(random(0, windowWidth), random(0, -900));
  }
  for (i = 0; i < 8; i++) {
    clouds[i] = new Cloud(220);
  }
  for (i = 0; i < 90; i++) {
    darkClouds[i] = new Cloud(130);
  }
  // rainSound.loop();
}

function draw() {
  windowResized();
  backgroundChange();
  drawMounts(windowHeight - windowHeight / 3, randomizer1, 55, noiseScale3);
  drawMounts(windowHeight - windowHeight / 3.5, randomizer2, 95, noiseScale2);
  drawMounts(windowHeight - windowHeight / 4.2, randomizer3, 100, noiseScale1);
  if (isRaining == true) {
    // thunder();
    for (i = 0; i < rain.length; i++) {
      rain[i].rainFall();
      range1 = 50;
      range2 = 170;
      range3 = 70;
    }
    for (i = 0; i < darkClouds.length; i++) {
      darkClouds[i].display();
      darkClouds[i].move(windSpeed);
    }
    // snowman();
  }

  if (isClouds == true) {
    for (i = 0; i < clouds.length; i++) {
      clouds[i].display();
      clouds[i].move(windSpeed);
      range1 = 30;
      range2 = 60;
      range3 = 80;
    }
  }
  if (isClear == true) {
    // drawSun();
  }

  if (isThunder == true) {
    thunder();
    for (i = 0; i < rain.length; i++) {
      rain[i].rainFall();
      range1 = 240;
      range2 = 220;
      range3 = 210;
    }
    for (i = 0; i < darkClouds.length; i++) {
      darkClouds[i].display();
      darkClouds[i].move(windSpeed);
    }
  }
}

function drawMounts(peak, randomizer, scale, noiseScale) {
  for (var x = 0; x < windowWidth; x++) {
    var noiseVal = noise((200 + x) * noiseScale, 100 * noiseScale);
    if (isSunsetAndClear == true) {
      stroke(30, sunsetHills + randomizer, 15);
    } else if (isNight == false && isClear == true) {
      stroke(
        redColor + randomizer,
        greenColor + randomizer,
        blueColor + randomizer
      );
    } else {
      stroke(150 + randomizer, 150 + randomizer, 150 + randomizer);
    }
    line(x, peak + noiseVal * scale, x, height);
  }
  noStroke();
}

function thunder() {
  var randomizer = random(0, 1000);
  if (randomizer > 995) {
    for (i = 0; i < 10; i++) {
      background(255);
    }
    thunderSound.play();
  }
}

function Rain(x, y) {
  this.x = x;
  this.y = y;
  this.droplength = 12;
  this.roundiness = 4;
  this.opacity = 100;

  this.rainFall = function() {
    noStroke();
    // this.opacity += 4;
    fill(50, this.opacity);
    ellipse(this.x, this.y, this.roundiness, this.droplength);
    this.y += 6;
    this.opacity -= 0.6;
    this.x += 0.8;
    if (this.y > windowHeight) {
      this.y = random(0, -200);
      this.x = random(-200, windowWidth);
      this.opacity = 100;
    }
  };
}

function rainSoundPlay() {
  rainSound.play();
}

function Snow(x, y) {
  this.x = x;
  this.y = y;
  this.roundiness = 7;

  this.snowfall = function() {
    noStroke();
    fill(200);
    ellipse(this.x, this.y, this.roundiness, this.roundiness);
    this.y += 6;
    this.x += 0.8;
    if (this.y > windowHeight) {
      this.y = random(0, -200);
      this.x = random(-200, windowWidth);
    }
  };
}

function snowman() {
  noStroke();
  fill(220, 230, 234);
  ellipse(windowWidth - 150, windowHeight - 100, 180, 180);
  ellipse(windowWidth - 190, windowHeight - 210, 120, 120);
  fill(20);

  ellipse(windowWidth - 220, windowHeight - 220, 20, 20);
  ellipse(windowWidth - 165, windowHeight - 240, 20, 20);
  fill(200, 150, 20);
  triangle(
    windowWidth - 190,
    windowHeight - 210,
    windowWidth - 150,
    windowHeight - 190,
    windowWidth - 170,
    windowHeight - 230
  );
}

function backgroundChange() {
  if (isNight == false) {
    if (isClear) {
      if (hoursInHundred >= 1700 && hoursInHundred <= 1800) {
        setGradient(0, 0, windowWidth, windowHeight, color1, color2);
        drawSun(mappedSunPosition);
      } else {
        background(40, 150, 190);
        drawSun(mappedSunPosition);
      }
    } else if (isRaining) {
      background(200);
    } else if (isClouds) {
      background(240);
    }
  } else if (isNight) {
    if (isRaining) {
      background("#6A6875");
      drawMoon(mappedMoonPosition);
    } else if (isClear || isClouds) {
      background("#003366");
      drawMoon(mappedMoonPosition);
    }
  }
}

function setGradient(x, y, w, h, c1, c2) {
  for (var i = y; i <= y + h; i++) {
    var inter = map(i, y, y + h, greenReducer, 0);
    var c = lerpColor(c2, c1, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}

function drawMoon(yPos) {
  fill(255, 254, 226);
  ellipse(200, yPos, 75, 75);
  if (isClear || isClouds) {
    fill("#003366");
    ellipse(187, yPos - 14, 48, 48);
  } else if (isRaining) {
    fill("#6A6875");
    ellipse(190, yPos - 14, 48, 48);
  }
}

function drawSun(yPos) {
  push();
  tint(255, 128);
  fill(245, 187, 87);
  stroke(245, 187, 87);
  // translate(100, yPos);
  // rotate(radians(frameCount / 2));
  ellipse(yPos, yPos, 70, 70);
  line(yPos, yPos - 60, yPos, yPos - 40);
  line(yPos, yPos + 40, yPos, yPos + 60);
  line(yPos - 45, yPos - 45, yPos - 30, yPos - 30);
  line(yPos + 45, yPos - 45, yPos + 30, yPos - 30);
  line(yPos - 60, yPos, yPos - 40, yPos);
  line(yPos + 40, yPos, yPos + 60, yPos);
  line(yPos - 45, yPos + 45, yPos - 30, yPos + 30);
  line(yPos + 45, yPos + 45, yPos + 30, yPos + 30);
  noFill();
  pop();
}

function Cloud(grayness) {
  this.x = random(100, -1100);
  this.y = random(0, 300);
  this.opacity = 300;
  this.rSpeed = windSpeed;

  this.display = function() {
    strokeWeight(1);
    fill(grayness, this.opacity);
    ellipse(this.x, this.y, 30, 30);
    ellipse(this.x + 10, this.y + 10, 24, 24);
    ellipse(this.x + 30, this.y + 10, 24, 24);
    ellipse(this.x + 30, this.y - 10, 30, 30);
    ellipse(this.x + 20, this.y, 24, 24);
    ellipse(this.x + 40, this.y, 26, 26);
  };

  this.move = function(windspeed) {
    windspeed = windSpeed;
    this.x += windSpeed;
    if (grayness > 200) {
      if (this.x >= 200) {
        this.opacity -= 4;
      }

      if (this.x >= 300) {
        this.x = random(0, -200);
        this.opacity = 300;
      }
    } else if (grayness <= 200) {
      if (this.x >= windowWidth - 100) {
        this.opacity -= 4;
      }

      if (this.x >= windowWidth) {
        this.x = random(0, -1000);
        this.opacity = 300;
      }
    }
  };
}

//API calls
function setLocationInput() {
  var inputName = document.getElementById("cityName");
  window.locationName = inputName.value;
  var api_url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    locationName +
    "&units=metric&APPID=34a205a46c6b7143fd71c5a4ac4c37ea";
  console.log(locationName);
  getWeatherData(api_url);
}

setInterval(function() {
  updateTime();
  var api_url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    locationName +
    "&units=metric&APPID=34a205a46c6b7143fd71c5a4ac4c37ea";
  getWeatherData(api_url);
}, 3000);

function updateTime() {
  var timeLabel = document.getElementById("currentTime");
  var d = new Date(),
    // h = 9;
    h = (d.getHours() < 10 ? "0" : "") + d.getHours(),
    m = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
  document.getElementById("currentTime").innerHTML = h + ":" + m;
  // hoursInHundred = h * 100;
  // hoursInHundred = hoursInHundred + m * 1.6;
  //comment two lines above out to show changing sketch due to time
  hoursInHundred = 1800;
  console.log(hoursInHundred);
  if (hoursInHundred > 1800 || hoursInHundred < 600) {
    isSunsetAndClear = false;
    isNight = true;
    if (hoursInHundred > 1800) {
      mappedMoonPosition = map(
        hoursInHundred,
        1800,
        2300,
        windowHeight - 300,
        100
      );
    } else if (hoursInHundred < 600) {
      mappedMoonPosition = map(hoursInHundred, 0, 500, 100, windowHeight - 300);
    }
  } else if (hoursInHundred <= 1800 && hoursInHundred >= 600) {
    isSunsetAndClear = false;
    isNight = false;
    if (hoursInHundred >= 600 && hoursInHundred <= 1200) {
      greenReducer = 130;
      mappedSunPosition = map(
        hoursInHundred,
        600,
        1200,
        windowHeight - 300,
        100
      );
      console.log("morning");
    } else if (hoursInHundred > 1200 && hoursInHundred <= 1800) {
      mappedSunPosition = map(
        hoursInHundred,
        1300,
        1800,
        100,
        windowHeight - 300
      );
      greenReducer = 130;
      console.log("afternoon :)");
      if (hoursInHundred >= 1700 && hoursInHundred <= 1800) {
        greenReducer = map(hoursInHundred, 1700, 1800, 0.7, 2);
        isSunsetAndClear = true;
        sunsetHills = map(hoursInHundred, 1700, 1800, 170, 45);
      } else {
        isSunsetAndClear = false;
      }
    }
  }
}

async function getWeatherData(api_url) {
  const response = await fetch(api_url);
  const data = await response.json();
  console.log(data);
  document.getElementById("temp").innerHTML =
    "<span class='makeBold'> Temperature: </span><br>" +
    data.main.temp +
    "&deg;C";
  document.getElementById("weather").innerHTML =
    "<span class='makeBold'> Weather: </span> <br>" + data.weather[0].main;
  document.getElementById("locationHTML").innerHTML = data.name;
  document.getElementById("humidity").innerHTML =
    "<span class='makeBold'> Humidity: </span><br>" + data.main.humidity + "%";
  window.windSpeed = data.wind.speed;
  console.log(windSpeed);

  if (data.weather[0].main == "Rain") {
    rainSoundPlay();
    isRaining = true;
    mountColor = 250;
    isClear = false;
    isClouds = false;
    isThunder = false;
  } else if (
    data.weather[0].main == "Clouds" ||
    data.weather[0].main == "Smoke"
  ) {
    isRaining = false;
    isClouds = true;
    isClear = false;
    isThunder = false;
    mountColor = 230;
    rainSound.stop();
  } else if (data.weather[0].main == "Thunderstorm") {
    isThunder = true;
    rainSound.play();
    isRaining = true;
    mountColor = 250;
    isClouds = false;
    isClear = false;
  } else if (data.weather[0].main == "Clear") {
    isRaining = false;
    isClouds = false;
    isClear = true;
    mountColor = 50;

    isThunder = false;
    rainSound.stop();
  }
}

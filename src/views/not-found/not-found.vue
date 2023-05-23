<template>
  <div class="error">
    <div class="container-floud">
      <div class="col-xs-12 ground-color text-center">
        <div class="container-error-404">
          <div class="clip">
            <div class="shadow">
              <span class="digit thirdDigit">{{ num1 }}</span>
            </div>
          </div>
          <div class="clip">
            <div class="shadow">
              <span class="digit secondDigit">{{ num2 }}</span>
            </div>
          </div>
          <div class="clip">
            <div class="shadow">
              <span class="digit firstDigit">{{ num3 }}</span>
            </div>
          </div>
          <div class="msg">OH!<span class="triangle"></span></div>
        </div>
        <h2>Sorry! Page not found</h2>
        <el-link style="font-size: 20px" type="primary" href="/">GO HOME</el-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref } from 'vue'

const num1 = ref(0)
const num2 = ref(0)
const num3 = ref(0)
let i = 0

const start = (num: Ref<number>, code: number, max: number) => {
  const timer = setInterval(function () {
    if (i > max) {
      clearInterval(timer)
      num.value = code
    } else {
      num.value = randomNum()
      i++
    }
  }, 30)
}
start(num1, 4, 40)
start(num2, 0, 80)
start(num3, 4, 100)

function randomNum() {
  return Math.floor(Math.random() * 9) + 1
}
</script>

<style scoped>
.error {
  display: flex;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
}

.container-floud {
  margin: auto;
}

.error .clip .shadow {
  overflow: hidden;
  height: 180px;
}

.error .clip:nth-of-type(2) .shadow {
  width: 130px;
}

.error .clip:nth-of-type(1) .shadow,
.error .clip:nth-of-type(3) .shadow {
  width: 250px;
}

.error .digit {
  width: 150px;
  height: 150px;
  line-height: 150px;
  font-weight: bold;
  font-size: 120px;
}

.error h2   /*Contrall*/ {
  font-size: 32px;
}

.error .msg /*Contrall*/ {
  left: 14%;
  top: -35px;
  width: 80px;
  height: 80px;
  line-height: 80px;
  font-size: 32px;
}

.error span.triangle    /*Contrall*/ {
  right: 0%;
  top: 70%;
  border-left: 20px solid #535353;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
}

.error .container-error-404 {
  position: relative;
  width: 850px;
  height: 250px;
}

.error .container-error-404 .clip {
  display: inline-block;
  transform: skew(-45deg);
}

.error .clip:nth-of-type(2) .shadow {
  overflow: hidden;
  position: relative;
  box-shadow: inset 20px 0 20px -15px rgb(150 150 150 / 80%), 20px 0 20px -15px rgb(150 150 150 / 80%);
}

.error .clip:nth-of-type(3) .shadow::after,
.error .clip:nth-of-type(1) .shadow::after {
  position: absolute;
  right: -8px;
  bottom: 0;
  z-index: 9999;
  border-radius: 50%;
  width: 10px;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgb(173 173 173 / 80%), transparent);
  content: '';
}

.error .clip:nth-of-type(3) .shadow::after {
  left: -8px;
}

.error .digit {
  display: inline-block;
  position: relative;
  top: 8%;
  border-radius: 50%;
  background: #07b3f9;
  color: white;
  transform: skew(45deg);
}

.error .clip:nth-of-type(2) .digit {
  left: -10%;
}

.error .clip:nth-of-type(1) .digit {
  right: -20%;
}

.error .clip:nth-of-type(3) .digit {
  left: -20%;
}

.error h2 {
  padding-bottom: 20px;
  font-weight: bold;
  color: #a2a2a2;
}

.error .msg {
  display: block;
  position: absolute;
  z-index: 9999;
  border-radius: 50%;
  background: #535353;
  font-style: italic;
  color: #a2a2a2;
}

.error .triangle {
  position: absolute;
  z-index: 999;
  width: 0;
  height: 0;
  content: '';
  transform: rotate(45deg);
}

/* Error Page */
@media (max-width: 767px) {
  /* Error Page */
  .error .clip .shadow {
    height: 100px;
  }

  .error .clip:nth-of-type(2) .shadow {
    width: 80px; /* Contrall play with javascript */
  }

  .error .clip:nth-of-type(1) .shadow,
  .error .clip:nth-of-type(3) .shadow {
    width: 100px;
  }

  .error .digit {
    width: 80px;
    height: 80px;
    line-height: 80px;
    font-size: 52px;
  }

  .error h2   /*Contrall*/ {
    font-size: 24px;
  }

  .error .msg /*Contrall*/ {
    left: 15%;
    top: -20px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
  }

  .error span.triangle    /*Contrall*/ {
    right: -3%;
    top: 70%;
    border-left: 10px solid #535353;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
  }

  .error .container-error-404 {
    width: 400px;
    height: 150px;
  }

  /* Error Page */
}
</style>

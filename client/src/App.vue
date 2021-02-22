<template>
  <div id="app">
<header class="navbar navbar-inverse navbar-fixed-top bs-docs-nav" role="banner">
    <div class="container">
      <div class="navbar-header">
        <a href="./" class="navbar-brand">NotifWeather</a>
      </div>
      <nav class="bs-navbar-collapse" role="navigation">
        <ul class="nav navbar-navigation navbar-right">
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="https://github.com/rushimanche/notifweather">Github</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/rushikesh-manche-9b10721a1/">LinkedIn</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
@import 'https://fonts.googleapis.com/css?family=Montserrat|Open+Sans';
.navbar-brand {
  font-family: 'Montserrat', sans-serif;
  font-size: 29px;
  display:inline;
  padding: 10px 40px;
  text-transform: lowercase;
  font-weight: bold;
}

.navbar .nav {
  font-family: 'Open Sans', sans-serif;
  text-transform: lowercase;
  letter-spacing: 3px;
  font-size: 1.3rem;
  font-weight: bold;
}

.navbar-inverse {
  background-color: #a7e9ff
}

.navbar-inverse .navbar-nav>.active>a:hover,
.navbar-inverse .navbar-nav>li>a:hover,
.navbar-inverse .navbar-nav>li>a:focus {
  background-color: #a7e9ff
}

.navbar-inverse .navbar-nav>.active>a,
.navbar-inverse .navbar-nav>.open>a,
.navbar-inverse .navbar-nav>.open>a,
.navbar-inverse .navbar-nav>.open>a:hover,
.navbar-inverse .navbar-nav>.open>a,
.navbar-inverse .navbar-nav>.open>a:hover,
.navbar-inverse .navbar-nav>.open>a:focus {
  background-color: #a7e9ff
}

.dropdown-menu {
  background-color: #006B00
}

.dropdown-menu>li>a:hover,
.dropdown-menu>li>a:focus {
  background-color: #a7e9ff
}

.navbar-inverse {
  background-image: none;
}

.dropdown-menu>li>a:hover,
.dropdown-menu>li>a:focus {
  background-image: none;
}

.navbar-inverse {
  border-color: #a7e9ff
}

.navbar-inverse .navbar-brand {
  color: #FFFFFF
}

.navbar-inverse .navbar-brand:hover {
  color: #ffff4d
}

.navbar-inverse .navbar-navigation>li>a {
  color: #FFFFFF
}

.navbar-inverse .navbar-navigation>li>a:hover,
.navbar-inverse .navbar-navigation>li>a:focus {
  color: #ffff4d
}

.navbar-inverse .navbar-navigation>.active>a,
.navbar-inverse .navbar-navigation>.open>a,
.navbar-inverse .navbar-navigation>.open>a:hover,
.navbar-inverse .navbar-navigation>.open>a:focus {
  color: #ffff4d
}

.navbar-inverse .navbar-navigation>.active>a:hover,
.navbar-inverse .navbar-navigation>.active>a:focus {
  color: #ffff4d
}

.dropdown-menu>li>a {
  color: #FFFFFF
}

.dropdown-menu>li>a:hover,
.dropdown-menu>li>a:focus {
  color: #ffff4d
}

.navbar-inverse .navbar-navigation>.dropdown>a .caret {
  border-top-color: #FFFFFF
}

.navbar-inverse .navbar-navigation>.dropdown>a:hover .caret {
  border-top-color: #FFFFFF
}

.navbar-inverse .navbar-navigation>.dropdown>a .caret {
  border-bottom-color: #FFFFFF
}

.navbar-inverse .navbar-navigation>.dropdown>a:hover .caret {
  border-bottom-color: #FFFFFF
}

li {
    display:inline;
    padding: 10px 40px;
}
</style>
<script>
export default {
  name: "app"
};
</script>
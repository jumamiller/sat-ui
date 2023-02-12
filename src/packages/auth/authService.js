class AuthService {
  constructor () {
    this.obj = {
      token: `${process.env.VUE_APP_NAME}_token`,
      user: `${process.env.VUE_APP_NAME}_user`,
    }
    this.token = window.localStorage.getItem(this.obj.token)
    this.profile = window.localStorage.getItem(this.obj.user)
  }

  check () {
    return !!this.token
  }

  token () {
    return !!this.token
  }

  user () {
    return window.localStorage.getItem(this.obj.user)
  }
  logout () {
    window.localStorage.removeItem(this.obj.token)
    window.localStorage.removeItem(this.obj.user)
    location.reload()
  }

  login ({ token, data }) {
    window.localStorage.setItem(this.obj.token, token)
    window.localStorage.setItem(this.obj.user, JSON.stringify(data))
    this.token = token
    this.user = data
  }

  setUser (user) {
    window.localStorage.removeItem(this.obj.user)
    window.localStorage.setItem(this.obj.user, JSON.stringify(user))
    this.user = user
    location.reload()
  }
}

export default new AuthService()

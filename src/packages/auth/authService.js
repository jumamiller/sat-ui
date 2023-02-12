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

  login ({ access_token, staff }) {
    window.localStorage.setItem(this.obj.token, access_token)
    window.localStorage.setItem(this.obj.user, JSON.stringify(staff))
    this.token = access_token
    this.user = staff
  }

  setUser (user) {
    window.localStorage.removeItem(this.obj.user)
    window.localStorage.setItem(this.obj.user, JSON.stringify(user))
    this.user = user
    location.reload()
  }
}

export default new AuthService()

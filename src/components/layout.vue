
<style scoped>
.layout {
  height: 100%;
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
  color: #fff;
  text-align: center;
  line-height: 30px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 70px;
}
.layout-content-card {
  height: calc(100% - 61px);
}
.layout-footer-center {
  text-align: center;
}
.userIcon {
  text-align: center;
}
.userName {
  color: #fff;
  margin-left: 5px;
}
</style>
<template>
  <div class="layout">
    <Layout :style="{height:'100%'}">
      <Header :style="{position:'relative'}">
        <Menu mode="horizontal" theme="dark" active-name="P" @on-select="routerChange">
          <div class="layout-logo">
            <img src="../assets/logo.png" alt width="100px">
          </div>
          <div class="layout-nav">
            <MenuItem name="P" to="/person">
              <Icon type="md-people"></Icon>人
            </MenuItem>
            <MenuItem name="C" to="/cat">
              <Icon type="md-paw"></Icon>猫
            </MenuItem>
            <MenuItem name="B" to="/book">
              <Icon type="ios-book"></Icon>书
            </MenuItem>
            <MenuItem name="M" to="/music">
              <Icon type="md-musical-note"></Icon>音&影
            </MenuItem>
            <MenuItem name="T" to="/chat">
              <Icon type="ios-chatbubbles"></Icon>交流
            </MenuItem>
          </div>
          <Dropdown class="userIcon" @on-click="dropSelect">
            <div>
              <Icon type="md-person" color="#fff" size="16"></Icon>
              <span class="userName">{{userName}}</span>
            </div>
            <DropdownMenu slot="list">
              <DropdownItem v-if="!hasToken" name="L">登 录</DropdownItem>
              <DropdownItem v-if="hasToken" name="E">退 出</DropdownItem>
              <DropdownItem v-if="hasToken" name="C">修 改</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Menu>
      </Header>
      <Content :style="{padding: '0 50px'}">
        <Breadcrumb :style="{margin: '20px 0'}">
          <BreadcrumbItem>Home</BreadcrumbItem>
          <BreadcrumbItem>Components</BreadcrumbItem>
          <BreadcrumbItem>Layout</BreadcrumbItem>
        </Breadcrumb>
        <Card class="layout-content-card">
          <div style="min-height: 200px;">
            <router-view></router-view>
          </div>
        </Card>
      </Content>
      <Footer class="layout-footer-center">2019-2020 &copy; www-lin</Footer>
    </Layout>
    <login-modal
      :loginModalProps="loginModalshow"
      v-on:closeLogin="closeLogin"
      v-on:changeLoginState="changeLoginState(type)"
    ></login-modal>
  </div>
</template>
<script>
/* eslint-disable*/
import LoginModal from "./login.vue";
export default {
  name: "LayoutComponent",
  components: {
    "login-modal": LoginModal
  },
  data() {
    return {
      loginModalshow: false,
      userName: "未登录",
      hasToken: false
    };
  },
  created: function() {
    if (localStorage.getItem("token")) {
      this.userName = JSON.parse(localStorage.getItem("userInfo")).username;
      this.hasToken = true;
    }
  },
  methods: {
    routerChange(name) {
      if (name === "P") {
        this.$router.push("/person");
      }
    },
    dropSelect(name) {
      if (name === "L") {
        this.loginModalshow = true;
      }
    },
    closeLogin() {
      this.loginModalshow = false;
    },
    getLoginStatus() {
      this.hasToken = localStorage.getItem("token") ? true : false;
      this.userName = JSON.parse(localStorage.getItem("userInfo")).username;
    },
    changeLoginState(type) {
      console.log(type);
    }
  }
};
</script>

<template>
  <Modal
    v-model="loginModal"
    :title="modalTitle"
    :loading="modalLoading"
    @on-ok="ok('formItem')"
    @on-cancel="onCancel"
  >
    <Form ref="formItem" :model="formItem" :rules="rules" :label-width="80">
      <FormItem label="名称" prop="username">
        <Input v-model="formItem.username" placeholder="you should have a name..."/>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input
          type="password"
          v-model="formItem.password"
          placeholder="you should have a password..."
        />
      </FormItem>
      <FormItem v-if="modalType==='R'" label="邮箱" prop="email">
        <Input v-model="formItem.email" placeholder="you clould have a email..."/>
      </FormItem>
      <FormItem v-if="modalType==='R'" label="男/女" prop="sex">
        <RadioGroup v-model="formItem.sex">
          <Radio label="1">Male</Radio>
          <Radio label="0">Female</Radio>
        </RadioGroup>
      </FormItem>
    </Form>
    <div style="text-align:right">
      <a v-if="modalType==='R'" @click="changeType('L')">登录</a>
      <a v-else @click="changeType('R')">注册</a>
    </div>
  </Modal>
</template>

<script>
/*eslint-disable*/
export default {
  name: "LoginModal",
  props: {
    loginModalProps: Boolean
  },
  data() {
    return {
      loginModal: this.loginModalProps,
      modalType: "L",
      modalTitle: "登录",
      modalLoading: true,
      list: [],
      formItem: {
        username: "",
        password: "",
        sex: "1",
        email: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "这个得填！"
          }
        ],
        sex: [
          {
            required: true,
            message: "这个得选！"
          }
        ],
        password: [
          {
            required: true,
            message: "这个得填！"
          }
        ],
        email: [
          {
            required: false
            // message: "这个也得填！"
          }
        ]
      }
    };
  },
  created: function() {
    console.log("loginmodal");
  },
  watch: {
    loginModalProps: {
      deep: true,
      handler(nVal, oVal) {
        console.log(nVal, oVal);
        this.loginModal = nVal;
        this.modalType = "L";
        this.modalTitle = "登录";
      }
    }
  },
  methods: {
    handleReachBottom() {
      this.$api.ChatService.getMsg().then(res => {
        this.list = res.data.retValue;
      });
    },
    ok(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          const data = this.$refs[name].model;
          const requestType =
            this.modalType === "L"
              ? this.$api.LoginService.userLogin(data)
              : this.$api.LoginService.userRegister(data);
          requestType.then(res => {
            if (res.data.retCode === 200) {
              this.$Message.success("提交成功");
              if (this.modalType === "L") {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("token_exp", new Date().getTime());
                localStorage.setItem(
                  "userInfo",
                  JSON.stringify(res.data.retValue)
                );
                this.$emit("changeLoginState", "L");
                this.onCancel();
              } else {
                this.modalType === "R";
              }
            }
          });
        }
      });
    },
    onCancel() {
      this.$emit("colseLogin");
    },
    changeType(type) {
      this.modalType = type;
      this.modalTitle = type === "L" ? "登录" : "注册";
    }
  }
};
</script>

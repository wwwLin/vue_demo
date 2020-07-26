<template>
  <div class="chat">
    <h1>我们应该讨论一些什么呢？</h1>
    <Scroll :on-reach-bottom="handleReachBottom" height:350>
      <Card dis-hover v-for="(item, index) in list" :key="index" style="margin: 32px 20px">
        <p>
          <Avatar
            v-if="item.sex==='1'"
            style="background-color:#2d8cf0;position: relative;bottom: 3px;"
            icon="md-male"
            size="small"
          ></Avatar>
          <Avatar
            v-else
            style="background-color:#e880c8;position: relative;bottom: 3px;"
            icon="md-female"
            size="small"
          ></Avatar>
          <span style="font-size:16px;font-weight:600;margin-left:5px">{{item.name}}</span>
        </p>
        <div style="margin:12px 12px 5px">
          <p>{{item.msg}}</p>
        </div>
      </Card>
    </Scroll>
    <div class="userInfo">
      <Form ref="formItem" :model="formItem" :rules="rules" :label-width="80">
        <!-- <FormItem label="username" prop="username">
          <Input v-model="formItem.username" placeholder="you should have a name..."/>
        </FormItem>
        <FormItem label="sex" prop="sex">
          <RadioGroup v-model="formItem.sex">
            <Radio label="1">Male</Radio>
            <Radio label="0">Female</Radio>
          </RadioGroup>
        </FormItem>-->
        <FormItem label="interest" prop="inst">
          <CheckboxGroup v-model="formItem.inst">
            <Checkbox label="cat">猫</Checkbox>
            <Checkbox label="movie">电影</Checkbox>
            <Checkbox label="book">书</Checkbox>
            <Checkbox label="music">音乐</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="message" prop="msg">
          <Input
            v-model="formItem.msg"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="talk something..."
          />
        </FormItem>
        <FormItem>
          <Button type="primary" @click="submit('formItem')">Submit</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<style>
.chat .userInfo {
  position: absolute;
  bottom: 16px;
  width: 50%;
}
</style>

<script>
/*eslint-disable*/
export default {
  name: "Chat",
  data() {
    return {
      list: [],
      formItem: {
        // username: "",
        // sex: "1",
        inst: ["cat", "movie", "book", "music"],
        msg: ""
      },
      rules: {
        // username: [
        //   {
        //     required: true,
        //     message: "这个得填！"
        //   }
        // ],
        // sex: [
        //   {
        //     required: true,
        //     message: "这个得选！"
        //   }
        // ],
        init: [
          {
            required: false
            // message: "这个得填！"
          }
        ],
        msg: [
          {
            required: true,
            message: "这个也得填！"
          }
        ]
      }
    };
  },
  created: function() {
    // this.$api.ChatService.getMsg().then(res => {
    //   this.list = res.data.retValue;
    // });
    this.handleReachBottom();
  },
  methods: {
    handleReachBottom() {
      this.$api.ChatService.getMsg().then(res => {
        this.list = res.data.retValue;
      });
    },
    submit(name) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo") || "");
      if (!userInfo.userId) {
        this.$Message.info("请先登录");
        return;
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          const data = { ...this.$refs[name].model, ...userInfo };
          this.$api.ChatService.sendMsg(data).then(res => {
            if (res.data.retCode === 200) {
              this.$Message.success("提交成功");
              this.handleReachBottom();
            }
          });
        }
      });
    }
  }
};
</script>
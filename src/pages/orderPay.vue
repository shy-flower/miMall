<template>
  <div class="orderPay">
    <div class="content">
      <div class="order">
        <div class="order_pay">
          <!-- 支付提示 -->
          <div class="item_order">
            <div class="item_icon"></div>
            <div class="item_Tips">
              <h1>订单提交成功! 去付款咯～</h1>
              <p>
                请在<span class="points">30分</span>内完成支付, 超时后将取消订单
              </p>
              <p>收货信息：{{ addressInfo }}</p>
            </div>
          </div>
          <!-- 支付金额 -->
          <div class="payment_Details">
            <p>应付总额：</p>
            <p>
              <span>{{ payment }}</span
              >元
            </p>
            <p>
              订单详情
              <span :class="iconStyle" @click="iconClick(iconStyle)"></span>
            </p>
          </div>
        </div>
        <!-- 订单详情 -->
        <div :class="Isproduct_name">
          <ul>
            <li>
              <p>订单号：</p>
              <p>{{ orderId }}</p>
            </li>
            <li>
              <p>收货信息：</p>
              <p>
                {{ addressInfo }}
              </p>
            </li>
            <li>
              <p>
                商品名称:
              </p>
            </li>
            <li v-for="(item, index) in orderDetail" :key="index">
              <div class="product_name">
                <img v-lazy="item.productImage" />
                <p>{{ item.productName }}</p>
              </div>
            </li>
            <li>
              <p>发票信息：</p>
              <p>电子发票 个人</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 支付扫码 -->
      <div class="pay_method">
        <h3>选择以下支付方式付款</h3>
        <p>支付平台</p>
        <!-- 支付宝支付 -->
        <div class="pay-ali" @click="payType(1)"></div>
        <!-- 微信支付 -->
        <div class="pay-wechat" @click="payType(2)"></div>
      </div>
    </div>
    <!-- 微信支付弹框 -->
    <el-dialog
      title="微信支付"
      :visible.sync="weiXinDialog"
      width="30%"
      @close="closeWeixinPay()"
    >
      <img :src="payImg" />
      <p>请使用微信扫一扫</p>
      <p>二维码完成支付</p>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <!-- 支付订单确认 -->
    <el-dialog title="支付确认" :visible.sync="PaymentDailog" width="30%">
      <span>您确认是否完成支付？</span>
      <span slot="footer" class="dialog-footer">
        <el-button class="btnPay" @click="goOrder()">查看订单</el-button>
        <el-button class="info" @click="Unpaid()">未支付</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  name: "orderPay",
  components: {},
  props: {},
  data() {
    return {
      iconStyle: "down", //订单详情按钮,默认向下
      Isproduct_name: "product_informationDisplay",
      orderId: this.$route.query.orderNo, //获取订单号
      addressInfo: "", //收货人地址
      orderDetail: [], //订单详情,包含商品列表
      weiXinDialog: false, //是否显示微信支付弹框弹框
      payImg: "",
      PaymentDailog: false,
      T: "", //定时器id
      payment: 0, //总金额
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getOrderDetail();
  },
  methods: {
    //点击订单详情icon改变样式
    iconClick(val) {
      if (val == "down") {
        this.iconStyle = "downUp";
        this.Isproduct_name = "product_information";
      } else {
        this.iconStyle = "down";
        this.Isproduct_name = "product_informationDisplay";
      }
    },
    getOrderDetail() {
      this.axios.get(`/orders/${this.orderId}`).then((res) => {
        let item = res.shippingVo;
        this.addressInfo = `${item.receiverName} ${item.receiverMobile} ${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress}`;
        this.orderDetail = res.orderItemVoList;
        this.payment = res.payment;
      });
    },
    payType(val) {
      if (val == 1) {
        //支付宝支付
        window.open("/#/order/aliPay?orderId=" + this.orderId, "_blank");
      } else {
        this.weiXinDialog = true;
        this.axios
          .post("/pay", {
            orderId: this.orderId, //
            orderName: "Vue高仿小米商城", //扫码支付时订单名称
            amount: 0.01, //单位元
            payType: 2, //1.支付宝 2.微信
          })
          .then((res) => {
            QRCode.toDataURL(res.content)
              .then((url) => {
                this.payImg = url;
                this.loopOrderState();
              })
              .catch(() => {
                this.$message.error("微信支付二维码生成失败,请稍候再试");
              });
          });
      }
    },
    closeWeixinPay() {
      this.PaymentDailog = true;
      clearInterval(this.T);
    },
    Unpaid() {
      this.PaymentDailog = false;
    },
    goOrder() {
      this.$router.push("/order/list");
    },
    //轮询订单支付状态
    loopOrderState() {
      this.T = setInterval(() => {
        this.axios.get(`/orders/${this.orderId}`).then((res) => {
          if (res.status == 20) {
            clearInterval(this.T);
            this.goOrder();
          }
        });
      }, 1000);
    },
  },
};
</script>

<style scoped lang="less">
@import "@/css/config.less";
@import "@/css/base.less";
.orderPay {
  background-color: #f5f5f5;
  padding-top: 20px;
  padding-bottom: 61px;

  .content {
    width: 1226px;
    margin-right: auto;
    margin-left: auto;
    text-align: center;
    .order {
      width: 100%;
      background-color: #ffffff;
      padding: 40px;
      .product_information {
        display: block;
        border-top: 1px solid #d7d7d7;
        padding-top: 47px;
        padding-left: 130px;
        font-size: 14px;
        margin-top: 45px;
        text-align: left;
        ul {
          li {
            list-style: none;
            p {
              display: inline-block;
            }
            img {
              width: 30px;
              height: 30px;
            }
            .product_name {
              padding-left: 100px;
            }
          }
        }
      }
      .product_informationDisplay {
        display: none;
        border-top: 1px solid #d7d7d7;
        padding-top: 47px;
        padding-left: 130px;
        font-size: 14px;
        margin-top: 45px;
        text-align: left;
        ul {
          li {
            list-style: none;
            p {
              display: inline-block;
            }
            img {
              width: 30px;
              height: 30px;
            }
            .product_name {
              padding-left: 100px;
            }
          }
        }
      }
      .order_pay {
        display: flex;
        .item_order {
          width: 65.5%;
          // background-color: pink;
          display: flex;
          text-align: left;
          margin-right: 248px;
          .item_icon {
            width: 90px;
            height: 90px;
            line-height: 90px;
            border-radius: 50%;
            background: url("http://mi.futurefe.com/imgs/icon-gou.png")
              no-repeat center rgb(128, 197, 138);
            background-size: 60px;
            margin-right: 40px;
            margin-top: 20px;
          }
          .item_Tips {
            h1 {
              margin-bottom: 20px;
            }
            p {
              margin: 0;
              font-size: 14px;
              color: rgb(102, 102, 102);
              .points {
                color: @colorA;
              }
            }
          }
        }
        .payment_Details {
          width: 25%;
          p {
            color: #333;
            font-size: 14px;
            span {
              font-size: 28px;
              color: rgb(255, 103, 0);
            }
            //点击向下的按钮
            .down {
              display: inline-block;
              transition: 0.5s;
              width: 14px;
              height: 10px;
              background: url("http://mi.futurefe.com/imgs/icon-down.png")
                no-repeat 50% center;
              background-size: 14px;
              margin-left: 9px;
              &:hover {
                cursor: pointer;
              }
            }
            //点击向上的按钮
            .downUp {
              transform: rotateZ(180deg);
              transition: 0.5s;
              display: inline-block;
              width: 14px;
              height: 10px;
              background: url("http://mi.futurefe.com/imgs/icon-down.png")
                no-repeat 50% center;
              background-size: 14px;
              margin-left: 9px;
              &:hover {
                cursor: pointer;
              }
            }
          }
        }
      }
    }

    .pay_method {
      margin-top: 20px;
      padding: 30px 40px 81px 40px;
      width: 100%;
      background-color: #ffffff;
      text-align: left;

      h3 {
        font-size: 20px;
        font-weight: 200e;
        color: #333;
        text-align: left;
        padding-bottom: 24px;
        border-bottom: 1px solid #d7d7d7;
        margin-bottom: 26px;
      }

      p {
        font-size: 20px;
      }
      .pay-ali {
        display: inline-block;
        width: 188px;
        height: 64px;
        border: 1px solid #d7d7d7;
        background: url("http://mi.futurefe.com/imgs/pay/icon-ali.png")
          no-repeat 50%;
        background-size: 103px 38px;
      }
      .pay-wechat {
        display: inline-block;
        width: 188px;
        height: 64px;
        border: 1px solid #d7d7d7;
        cursor: pointer;
        background: url("http://mi.futurefe.com/imgs/pay/icon-wechat.png")
          no-repeat 50%;
        background-size: 103px 38px;
        margin-left: 20px;
      }
    }
  }

  .el-dialog {
    text-align: center;
    img {
      width: 300px;
    }
  }
  .btnPay {
    .themeButton(110px, 30px);
  }
  .info {
    width: 110px;
    height: 30px;
    padding: 0;
    border: 1px solid #b0b0b0;
    background-color: #b0b0b0;
    color: #ffffff;
    text-align: center;
  }
  .el-dialog__header {
    width: 300px;
  }
  .el-dialog__body {
    width: 300px;
  }
}
</style>

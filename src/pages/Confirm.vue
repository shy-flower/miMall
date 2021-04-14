<template>
  <div class="confirm">
    <div class="content">
      <el-card>
        <!-- 收货地址区域 -->
        <div class="receivingAddress">
          <h2 class="addrs">收货地址</h2>
          <div class="addrBox">
            <ul>
              <li
                @click="clickAddresStyle(item.id)"
                v-for="(item, index) in list"
                :key="index"
                :class="{ liStyle: item.id == isClass }"
              >
                <h2 prop="receiverName">{{ item.receiverName }}</h2>
                <p>{{ item.receiverMobile }}</p>
                <span>{{
                  item.receiverProvince +
                    " " +
                    item.receiverCity +
                    " " +
                    item.receiverDistrict +
                    " " +
                    item.receiverAddress
                }}</span>
                <div class="address_footer">
                  <!-- 删除 -->
                  <a
                    href="javascript:;"
                    class="delete"
                    @click="deleteDialog(item)"
                  >
                    <i class="el-icon-delete"></i>
                  </a>
                  <!-- 编辑 -->
                  <a href="javascript:;" @click="editAddress(item)">
                    <i class="el-icon-edit"></i>
                  </a>
                </div>
              </li>
              <li>
                <div @click="addNewAddre()">
                  <div class="icon"></div>
                  <span class="newAddrs">添加新地址</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 商品信息列表区域 -->
        <div class="Product_information">
          <h2>商品</h2>
          <ul class="product_list">
            <li v-for="(item, index) in cartList" :key="index">
              <div class="imgs">
                <img :src="item.productMainImage" />
                <span
                  >{{ item.productName + " " + item.productSubtitle }}
                </span>
              </div>
              <div class="prodcuct_price">
                <span>{{
                  item.productPrice + "元" + "x" + item.quantity
                }}</span>
              </div>
              <div class="total_Price">
                <span> {{ item.productTotalPrice + "元" }}</span>
              </div>
            </li>
          </ul>
        </div>
        <!--配送方式区域  -->
        <div class="delivery_mode">
          <div class="delivery_item">
            <h2>配送方式</h2>
            <span>包邮</span>
          </div>
          <div class="delivery_item">
            <h2>发票</h2>
            <span>电子发票</span>
            <span>个人</span>
          </div>
        </div>
        <!-- 商品详情区域 -->
        <div class="product_details">
          <div class="details_item">
            <span class="item_name">商品件数：</span>
            <span class="item-val">{{ count }}件 </span>
          </div>
          <div class="details_item">
            <span class="item_name">商品总价：</span>
            <span class="item-val">{{ cartTotalPrice }}元 </span>
          </div>
          <div class="details_item">
            <span class="item_name">优惠活动：</span>
            <span class="item-val">0元 </span>
          </div>
          <div class="details_item">
            <span class="item_name">运费：</span>
            <span class="item-val">0元 </span>
          </div>
          <div class="details_item">
            <span class="item_total">应付总额：</span>
            <span class="item-price">{{ cartTotalPrice }}元 </span>
          </div>
        </div>
        <!-- 底部区域 -->
        <div class="product_footer">
          <el-button class="goBackCart">返回购物车</el-button>
          <el-button class="goSettlement" @click="OrderSubmit"
            >去结算</el-button
          >
        </div>
      </el-card>
    </div>
    <!-- 对话框区域 -->
    <!-- 删除对话框 -->
    <el-dialog title="删除确认" :visible.sync="DeletDialogVisible" width="30%">
      <span class="delet">您确认要删除此地址吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitAddress()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑和添加对话框 -->
    <el-dialog title="新增确认" :visible.sync="modifyDialogVisible" width="30%">
      <!-- 用户名称+联系方式 -->
      <div class="titleInput">
        <el-input
          v-model="checkedItem.receiverName"
          placeholder="姓名"
        ></el-input>
        <el-input
          v-model="checkedItem.receiverMobile"
          placeholder="电话"
        ></el-input>
      </div>
      <!-- 地区 -->
      <div class="select">
        <!--省 -->
        <el-select v-model="checkedItem.receiverProvince" placeholder="请选择">
          <el-option
            v-for="item in provinceSelet"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          >
          </el-option>
          <!-- 市 -->
        </el-select>
        <!-- 市 -->
        <el-select v-model="checkedItem.receiverCity" placeholder="请选择">
          <el-option
            v-for="item in cityValSelet"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <!-- 区 -->
        <el-select v-model="checkedItem.receiverDistrict" placeholder="请选择">
          <el-option
            v-for="item in areaValSelet"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <!-- 详细地址(文本域) -->
      <div class="detailedAddress">
        <el-input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 4 }"
          placeholder="请输入详细地址"
          v-model="checkedItem.receiverAddress"
        >
        </el-input>
      </div>
      <div class="Postcode">
        <el-input
          v-model="checkedItem.receiverZip"
          placeholder="邮编"
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitAddress()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import OrderHeader from "@/components/NavHearder.vue";
export default {
  name: "confirm",
  components: {
    OrderHeader,
  },
  props: {},
  data() {
    return {
      list: [], //收货地址列表
      cartList: [], //购物车中需要结算的商品列表
      cartTotalPrice: 0, //商品总金额
      count: 0, //商品结算数量
      DeletDialogVisible: false, //删除对话框展示
      modifyDialogVisible: false, //确认对话框展示
      checkedItem: {}, //选中的商品对象
      userAction: "", //用户行为 0:新增 ,1:编辑,2:删除
      provinceSelet: [
        {
          id: 1,
          label: "浙江省",
        },
        {
          id: 2,
          label: "湖南省",
        },
        {
          id: 3,
          label: "广东省",
        },
      ], //省区域对象
      cityValSelet: [
        {
          id: 1,
          label: "株洲市",
        },
        {
          id: 2,
          label: "广州市",
        },
        {
          id: 3,
          label: "杭州市",
        },
      ], //市区域对象
      areaValSelet: [
        {
          id: 1,
          label: "西湖区",
        },
        {
          id: 2,
          label: "禅城区",
        },
        {
          id: 3,
          label: "顺德区",
        },
      ], //区 对象
      isClass: 0, //动态地址框选中样式
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getAddressList();
    this.getCartList();
  },
  methods: {
    //获取收货地址
    getAddressList() {
      this.axios.get("/shippings").then((res) => {
        this.list = res.list;
      });
    },
    getCartList() {
      this.axios.get("/carts").then((res) => {
        let list = res.cartProductVoList; //获取购物车中所有的商品数据
        this.cartTotalPrice = res.cartTotalPrice; //商品选中的总金额
        this.cartList = list.filter((item) => item.productSelected); //过滤返回所有选中的商品列表
        this.cartList.map((item) => {
          this.count += item.quantity;
        });
      });
    },
    //删除地址弹框
    deleteDialog(item) {
      this.checkedItem = item;
      this.userAction = 2;
      this.DeletDialogVisible = true;
    },
    //编辑地址弹框
    editAddress(item) {
      this.checkedItem = item;
      this.userAction = 1;
      this.modifyDialogVisible = true;
    },
    //添增新地址弹框
    addNewAddre() {
      this.userAction = 0;
      this.modifyDialogVisible = true;
    },
    //地址删除,编辑,新增功能,
    submitAddress() {
      //用户行为 0:新增 ,1:编辑,2:删除
      let { checkedItem, userAction } = this;
      let method,
        url,
        params = {};

      if (userAction == 0) {
        method = "post";
        url = "/shippings";
        params = {
          receiverAddress: checkedItem.receiverAddress,
          receiverCity: checkedItem.receiverCity,
          receiverDistrict: checkedItem.receiverDistrict,
          receiverMobile: checkedItem.receiverMobile,
          receiverName: checkedItem.receiverName,
          receiverProvince: checkedItem.receiverProvince,
          receiverZip: checkedItem.receiverZip,
        };
      } else if (userAction == 1) {
        method = "put";
        url = `/shippings/${checkedItem.id}`;
        params = {
          receiverAddress: checkedItem.receiverAddress,
          receiverCity: checkedItem.receiverCity,
          receiverDistrict: checkedItem.receiverDistrict,
          receiverMobile: checkedItem.receiverMobile,
          receiverName: checkedItem.receiverName,
          receiverProvince: checkedItem.receiverProvince,
          receiverZip: checkedItem.receiverZip,
        };
      } else {
        method = "delete";
        url = `/shippings/${checkedItem.id}`;
      }
      //验证规则

      if (!checkedItem.receiverName) {
        this.$message.error("用户名称不能为空");

        return;
      } else if (!checkedItem.receiverCity) {
        this.$message.error("请选择市");
        return;
      } else if (!checkedItem.receiverDistrict) {
        this.$message.error("请选择区");
        return;
      } else if (!checkedItem.receiverMobile) {
        this.$message.error("手机号码不能为空");
        return;
      } else if (!checkedItem.receiverCity) {
        this.$message.error("用户名称不能为空");
        return;
      } else if (!checkedItem.receiverProvince) {
        this.$message.error("请选择省");
        return;
      } else if (!checkedItem.receiverZip) {
        this.$message.error("请输入六位邮编");
        return;
      } else if (!checkedItem.receiverAddress) {
        this.$message.error("请输入详细地址");
        return;
      }

      this.axios[method](url, params).then(() => {
        this.closeModal();
      });
    },
    closeModal() {
      this.checkedItem = {};
      this.userAction = "";
      this.DeletDialogVisible = false;
      this.modifyDialogVisible = false;
      this.getAddressList();
      this.$message.success("操作成功");
    },
    clickAddresStyle(id) {
      this.isClass = id;
    },
    //去结算
    OrderSubmit() {
      if (this.isClass == 0) {
        this.$message.error("请选择地址");
        return;
      }
      this.axios
        .post("/orders", {
          shippingId: this.isClass,
        })
        .then((res) => {
          this.$router.push({
            path: "/order/pay",
            query: {
              orderNo: res.orderNo,
            },
          });
        });
    },
  },
};
</script>

<style scoped lang="less">
@import "@/css/config.less";
@import "@/css/base.less";
@import "@/css/globle.less";
.confirm {
  background: #f5f5f5;
  padding-bottom: 84px;
  .content {
    .container();
    .el-card {
      width: 100%;
      padding-left: 40px;
      padding-bottom: 40px;
      .addrs {
        text-align: left;
        font-size: 20px;
        color: #333;
        font-weight: 200;
        margin-bottom: 21px;
      }
      .receivingAddress {
        overflow: hidden;
        .addrBox {
          width: 100%;
        }

        ul {
          text-align: left;
          padding: 0 !important;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          .liStyle {
            border: 1px solid @colorA;
          }
        }

        li {
          border: 1px solid #e5e5e5;
          box-sizing: border-box;
          width: 271px;
          height: 180px;
          margin-right: 15px;
          padding: 15px 24px;
          font-size: 14px;
          color: #757575;
          text-align: left;
          display: inline-block;
          margin-bottom: 10px;
          h2 {
            height: 27px;
            font-size: 18px;
            color: #333;
            margin-bottom: 10px;
          }
          p {
            margin: 0 !important;
          }
          span {
            display: inline-block;
            box-sizing: border-box;
            height: 50px;
          }
          .addrFoot {
            width: 100%;
            height: 50px;
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            .el-icon-delete:before,
            .el-icon-edit:before {
              font-size: 20px;
            }
          }
        }
        .icon {
          box-sizing: border-box;
          width: 30px;
          height: 30px;
          background: url("http://mi.futurefe.com/imgs/icon-add.png") no-repeat
            center 50%;
          background-size: 14px;
          background-color: #e0e0e0;
          border-radius: 50%;
          margin: 0 auto;
          margin-bottom: 10px;
          margin-top: 33px;
        }
        .newAddrs {
          display: inline-block;
          width: 100%;
          text-align: center;
        }
        .address_footer {
          float: left;
          justify-content: space-between;
          width: 100%;
          a {
            display: inline-block;
            width: 20px;
            height: 20px;
            text-align: center;
            color: #757575;
            font-size: 20px;
          }

          .delete {
            margin-right: 80%;
          }
        }
      }
      .Product_information {
        h2 {
          text-align: left;
        }
        .product_list {
          width: 100%;
          border-top: 1px solid #e5e5e5;
          border-bottom: 1px solid #e5e5e5;
          padding: 15px 40px 15px 0px;

          li {
            display: inline-block;
            width: 100%;
            height: 40px;
            line-height: 40px;
            display: flex;
            justify-content: space-between;

            .imgs {
              width: 770px;
              height: 40px;
              text-align: left;
              img {
                vertical-align: middle;
                width: 30px;
                height: 30px;
              }
              span {
                font-size: 16px;
                color: #333;
                font-weight: 10px;
                font: 微软雅黑;
              }
            }
          }
        }
        .prodcuct_price {
          span {
            display: inline-block;
            text-align: left;
            font-size: 16px;
            color: black;
            width: 311px;
            height: 40px;
          }
        }
        .total_Price {
          span {
            color: @colorA;
            font-size: 16px;
            display: inline-block;
            text-align: left;
            width: 95.5px;
            height: 40px;
          }
        }
      }
      .delivery_mode {
        margin-top: 30px;
        .delivery_item {
          width: 100%;
          text-align: left;
          h2 {
            display: inline-block;
            text-align: left;
            font-size: 20px;
            margin-right: 71px;
            width: 80px;
          }
          span {
            color: @colorA;
            font-size: 16px;
            margin-right: 23px;
          }
        }
      }
      .product_details {
        text-align: right;
        padding: 50px 44px 33px 0px;
        border-bottom: 1px solid #e5e5e5;
        .details_item {
          margin-bottom: 8px;
          display: flex;
          text-align: right;
          .item_name {
            display: block;
            width: 90%;
            font-size: 16px;
            color: #666;
          }
          .item-val {
            display: block;
            font-size: 16px;
            color: @colorA;
            width: 10%;
          }
          .item_total {
            font-size: 28px;
            color: #666;
            width: 90%;
          }
          .item-price {
            display: block;
            font-size: 28px;
            color: @colorA;
            width: 10%;
          }
        }
      }
      .product_footer {
        margin-top: 37px;
        text-align: right;
        .goBackCart {
          width: 202px;
          height: 50px;
          margin-right: 20px;
          line-height: 50px;
          font-size: 18px;
          padding: 0;
          border: 1px solid #b0b0b0;
          background-color: #b0b0b0;
          color: #ffffff;
          text-align: center;
        }
        .goSettlement {
          width: 202px;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          padding: 0;
          border: 1px solid @colorA;
          background-color: @colorA;
          color: #ffffff;
          text-align: center;
        }
      }
    }
  }
  button.el-button.el-button--default {
    width: 110px;
    height: 30px;
    padding: 0;
    border: 1px solid #ff6600;
    background-color: #ff6600;
    color: #ffffff;
    text-align: center;
  }

  .delet {
    font-size: 16px;
  }

  .titleInput {
    margin-bottom: 15px;
    width: 594px;
    .el-input {
      width: 283px;
      margin-right: 14px;
    }
  }
  .select {
    margin-bottom: 15px;
    .el-select {
      width: 100px;
      margin-right: 15px;
    }
  }
  .Postcode {
    margin-top: 15px;
    margin-bottom: 15px;

    .el-input {
      width: 283px;
    }
  }
}
</style>

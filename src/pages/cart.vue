<template>
  <div class="cart">
    <div class="cart_background">
      <div class="content">
        <!-- 购物车头部 -->
        <div class="cart_title">
          <div class="cart_left">
            <div class="header-logo">
              <a href="/#/index"></a>
            </div>
            <div>
              <h1>我的购物车</h1>
              <span
                >温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span
              >
            </div>
          </div>
          <!-- 购物车右边 -->
          <div class="cart_right">
            <span>{{ username }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="cartBody">
      <div class="content">
        <el-card class="cart-card">
          <el-table
            :data="list"
            style="width: 120%"
            ref="cartTable"
            @select-all="allSelect()"
            @select="change"
          >
            <!-- 多选 -->
            <el-table-column type="selection" width="57%"> </el-table-column>
            <el-table-column width="67%" label="全选">
              <template slot-scope="scope">
                {{ scope.row.productId }}
              </template>
            </el-table-column>
            <el-table-column width="100%">
              <template slot-scope="scope">
                <img v-lazy="scope.row.productMainImage" />
              </template>
            </el-table-column>
            <el-table-column prop="productName" label="商品名称">
            </el-table-column>
            <el-table-column prop="productPrice" label="单价">
            </el-table-column>
            <el-table-column prop="quantity" label="数量">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.quantity"
                  @change="cartNumChange(scope.row)"
                  :min="min"
                  :max="max"
                  label="描述文字"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column prop="productTotalPrice" label="小计">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <i class="el-icon-close" @click="deleteItem(scope.row)"></i>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
      <!-- 购物车底部 -->
      <div class="cart_footer">
        <div class="footer_left">
          <a href="javascript:;" @click="goIndex">
            继续购物
          </a>
          <span>
            共<span class="colorA">{{ list.length }}</span
            >件商品，已选择<span class="colorA">{{ allchekedNum }}</span
            >件
          </span>
        </div>
        <div class="footer_right">
          <span class="colorA">合计:</span>
          <h2 class="colorA">{{ cartTotalPrice }}</h2>
          <el-button class="btn" @click="order()">去结算</el-button>
        </div>
      </div>
    </div>
    <ServiceBar></ServiceBar>
    <NavFooter></NavFooter>
  </div>
</template>

<script>
import NavFooter from "@/components/NavFooter.vue";
import ServiceBar from "@/components/ServiceBar.vue";
import { mapState } from "vuex";
export default {
  name: "cart",
  components: {
    NavFooter,
    ServiceBar,
  },
  props: {},
  data() {
    return {
      list: [],
      productId: 0, //用户id
      cartTotalPrice: 0, //选中商品总金额
      selectedAll: true, //是否全选
      cartTotalQuantity: 0, //购物车总数量
      allchekedNum: 0, //选中商品数量
      clickId: 0, //被选中的商品id
      hasSelectList: [], //已经选择的id的数组
      min: 1, //计数器最少选择一件商品
      max: 10000000, //最多可选择N多个商品
    };
  },
  computed: {
    ...mapState(["username"]),
  },
  watch: {},
  created() {
    this.getCartList();
  },
  mounted() {},
  methods: {
    //获取购物车数据
    getCartList() {
      this.axios
        .get(`/carts`)
        .then((res) => {
          this.list = res.cartProductVoList;
          this.selectedAll = res.selectedAll;
          this.cartTotalPrice = res.cartTotalPrice;
        })
        .then(() => {
          this.list.forEach((item) => {
            if (item.productSelected == true)
              this.$refs.cartTable.toggleRowSelection(item, true);
          });
        });
    },
    //触发的row

    //点击删除按钮,移出商品
    deleteItem(row) {
      this.row;
      console.log(row);
      this.axios.delete(`/carts/${row.productId}`).then(() => {
        this.$message.success("删除成功");
        this.getCartList();
        return;
      });
    },

    //点击加减计数器触发
    async cartNumChange(row) {
      if (row.quantity <= 0) {
        this.$message.error("至少选择一件商品!");
        return;
      } else if (row.quantity >= 10000000) {
        this.$message.error("库存不足");
      }
      const res = await this.axios.put(`/carts/${row.productId}`, {
        quantity: row.quantity,
        selected: row.selected,
      });
      this.cartTotalPrice = res.cartTotalPrice;
      this.getCartList();
    },
    //继续购物
    goIndex() {
      this.$router.replace("/index");
    },

    //用户点击全选,发起请求
    async allSelect() {
      this.selectedAll = !this.selectedAll;
      if (this.selectedAll === true) {
        const a = await this.axios.put("/carts/selectAll");
        this.cartTotalPrice = a.cartTotalPrice;

        return;
      }
      const b = await this.axios.put("/carts/unSelectAll");
      this.cartTotalPrice = b.cartTotalPrice;
    },

    //单个选项框选中时
    async change(a, row) {
      console.log(row);
      const res = await this.axios.put(`/carts/${row.productId}`, {
        quantity: row.quantity,
        selected: !row.productSelected,
      });
      row.productSelected = !row.productSelected;
      this.cartTotalPrice = res.cartTotalPrice;
      this.allchekedNum = this.$refs.cartTable.selection.length;
      //保存已选中的商品数量
      /*   this.cartNumChange(); */
    },
    order() {
      let isCheck = this.list.every((item) => {
        item.productSelected === false;
      });
      if (isCheck) {
        this.$message.error("至少选择一件商品");
      }
      this.$router.push("/order/confirm");
    },
  },
};
</script>

<style scoped lang="less">
@import "@/css/base.less";
@import "@/css/config.less";
@import "@/css/globle.less";

.cart {
  background-color: #f5f5f5;

  .cart_background {
    width: 100%;
    background-color: #ffffff;
  }
  .content {
    .container();
    .cart_title {
      width: 100%;
      display: flex;
      justify-content: space-between;
      text-align: center;
      height: 55px;
      line-height: 55px;
      padding: 30px 0;
      .cart_left {
        display: flex;
        h1 {
          display: inline-block;
          padding: 0 !important;
          margin: 0;
          margin-right: 10px;
          font-size: 28px;
        }
        span {
          color: #999;
          font-size: 14px;
        }
        .header-logo {
          display: inline-block;
          width: 110px;
          height: 55px;
          a:nth-child(1) {
            display: inline-block;
            width: 55px;
            height: 55px;
            text-align: center;
            background: url("http://mi.futurefe.com/imgs/mi-logo.png");
            background-color: #ff6600;
          }
        }

        .cart_right {
          font-size: 16px;
          color: #666;
        }
      }
    }
  }
  .cartBody {
    .content {
      .el-card {
        margin-top: 30px;
      }
    }
    border-top: 2px solid @colorA;
    .cart-card {
      width: 100%;
      .el-icon-close:before {
        font-size: 22px;
      }
      img {
        width: 80px;
        height: 80px;
        vertical-align: middle;
      }
    }
  }
  .cart_footer {
    margin-top: 20px;
    height: 50px;
    line-height: 50px;
    .container();
    .footer_left {
      a {
        text-decoration: none;
        margin-right: 37px;
        font-size: 14px;
        color: #666;
      }
      span {
        color: #666;
        font-size: 14px;
        .colorA {
          color: @colorA;
          margin: 0px 5px;
        }
      }
    }
    .footer_right {
      h2 {
        display: inline-block;
        font-size: 24px;
      }
      span {
        text-decoration: none;
        color: #666;
        font-size: 14px;
      }
      .colorA {
        color: @colorA;
        margin: 0px 5px;
      }
      .btn {
        .themeButton(202px, 50px);
        font-size: 16px;
        margin-left: 37px;
      }
    }
  }
}
</style>

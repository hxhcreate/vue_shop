<template>
  <el-aside :width="isCollapse? '64px': '200px'">
    <div class='toggle_button' @click='isCollapse = !isCollapse'>
      |||
    </div>
    <el-menu
      background-color='#333744'
      class='el-menu-vertical-demo'
      text-color='#fff'
      active-text-color='#2e9afe'
      unique-opened
      :collapse='isCollapse'
      :collapse-transition='false'
      router
      :default-active='this.$route.path'
    >
      <!--    一级菜单-->
      <el-submenu :index="item.path + ''" v-for='item in menuList' :key='item.id'
      >
        <template #title>
          <el-icon :size='22' class='icon_append' :class='iconList[item.id]'>
          </el-icon>
          <span>{{ item.authName }}</span>
        </template>
        <!--      二级菜单-->
        <el-menu-item :index="'/home/'+ subItem.path" v-for='subItem in item.children' :key='subItem.id'

        >
          <template #title>
            <el-icon :size='15' class='icon_append'>
              <icon-menu />
            </el-icon>
            <span>{{ subItem.authName }}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>

</template>
<script>
import {
  Location,
  Menu as iconMenu
} from '@element-plus/icons-vue'

export default {
  name: 'Sidebar',
  data() {
    return {
      menuList: [],
      iconList: {
        125: 'el-icon-user-solid',
        103: 'el-icon-s-check',
        101: 'el-icon-s-shop',
        102: 'el-icon-s-order',
        145: 'el-icon-s-marketing'
      },
      isCollapse: false
    }
  },
  components: {
    Location,
    iconMenu
  },
  //这个是渲染前调用的函数
  created() {
    this.getMenuList()
  },
  methods: {
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      console.log(res)
      this.menuList = res.data
    },
    toggle() {

    }
  }
}
</script>

<style scoped>
.el-aside {
  background-color: #333744;
}

.icon_append {
  margin-right: 10px;
  margin-bottom: 1px;
}

.el-menu-vertical-demo {
  border: none;
}

.toggle_button {
  background-color: #4a5064;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 2px;
  cursor: pointer
}
</style>

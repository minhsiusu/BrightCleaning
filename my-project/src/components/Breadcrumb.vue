<template>
  <nav class="breadcrumb">
      <ul>
          <li v-for="(crumb, index) in breadcrumbs" :key="index">
            <!--當前路徑 不讓使用者點 的判斷 當前路徑-1就是前面的的路徑-->
              <router-link :to="crumb.path" v-if="index !== breadcrumbs.length - 1">
                  {{ crumb.name }}
              </router-link>
              <span v-else>{{ crumb.name }}</span>
          </li>
      </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    breadcrumbs() {
      const breadcrumbs = [{ name: '首頁', path: '/' }]; // 手動添加首頁

      // 自動生成當前路由的麵包屑
      this.$route.matched.forEach(route => {
        let path = route.path;

        // 替換動態參數
        Object.keys(this.$route.params).forEach(param => {
          path = path.replace(`:${param}`, this.$route.params[param]);
        });

        const breadcrumbName = typeof route.meta.breadcrumb === 'function'
          ? route.meta.breadcrumb(this.$route)
          : route.meta.breadcrumb;
          breadcrumbs.push({ name: breadcrumbName, path });
        });

        // 動態生成上一頁的分類頁面麵包屑
        if (this.$route.name === 'ProductPurchasing') {
            const category = this.$route.params.category; // 獲取當前分類
            if (category) {
                breadcrumbs.splice(1, 0, {
                    name: `產品介紹 - ${category}`,
                    path: `/product-introduction/${category}`
                });
            } else {
                breadcrumbs.splice(1, 0, {
                    name: '產品介紹',
                    path: '/product-introduction'
                });
            }
        }
        return breadcrumbs;
    },
  },
};
</script>

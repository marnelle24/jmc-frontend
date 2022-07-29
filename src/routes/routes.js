import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import Overview from 'src/pages/Overview.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import TableList from 'src/pages/TableList.vue'
import Typography from 'src/pages/Typography.vue'
import Icons from 'src/pages/Icons.vue'
import Maps from 'src/pages/Maps.vue'
import Notifications from 'src/pages/Notifications.vue'
import Upgrade from 'src/pages/Upgrade.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('src/pages/Login'),
  },
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/overview',
    meta: { requiresAuth: true },
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile
      },
      {
        path: 'table-list',
        name: 'Table List',
        component: TableList
      },
      {
        path: 'typography',
        name: 'Typography',
        component: Typography
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade
      },

      // custom components/pages
      {
        path: 'products',
        name: 'Products',
        component: () => import('src/pages/Product/Products')
      },
      {
        path: 'products/new',
        name: 'Add New Product',
        component: () => import('src/pages/Product/SingleProduct')
      },
      {
        path: 'product/:slug',
        name: 'Single Product Page',
        component: () => import('src/pages/Product/SingleProduct')
      },
      {
        path: 'categories',
        name: 'Categories',
        component: () => import('src/pages/Category/Categories')
      },
      {
        path: 'category/new',
        name: 'Add New Category',
        component: () => import('src/pages/Category/SingleCategory')
      },
      {
        path: 'category/:slug',
        name: 'Single Category Page',
        component: () => import('src/pages/Category/SingleCategory')
      },
      {
        path: 'inventory',
        name: 'Inventory Page',
        component: () => import('src/pages/Transaction/InventoryList')
      },
    ]
  },


  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes

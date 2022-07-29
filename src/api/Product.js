import Api from "./Api";
import Csrf from "./Csrf";

export default
{
    async all()
    {
      await Csrf.getCookie();
      return Api.get('/product/all');
    },

    async getProduct(slug)
    {
      await Csrf.getCookie();
      return Api.get(`/product/${slug}`);
    },

    async save(data)
    {
      await Csrf.getCookie();
      return Api.post('/product/save', data)
    },
    async update(data)
    {
      await Csrf.getCookie();
      return Api.post('/product/update', data)
    },
    async delete(id)
    {
      await Csrf.getCookie();
      return Api.get(`/product/delete/${id}`)
    }
}

import Api from "./Api";
import Csrf from "./Csrf";

export default
{
    async all()
    {
        await Csrf.getCookie();
        return Api.get('/category/all');
    },

    async getCategory(slug)
    {
      await Csrf.getCookie();
      return Api.get(`/category/${slug}`);
    },

    async save(data)
    {
        await Csrf.getCookie();
        return Api.post('/category/save', data)
    },

    async update(data)
    {
        await Csrf.getCookie();
        return Api.post('/category/update', data)
    },

    async delete(id)
    {
        await Csrf.getCookie();
        return Api.get(`/category/delete/${id}`)
    }
}

using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;


namespace Infraestructure
{
    public interface IGenericMethods<T>
    {
        public Task<Response> Get(string Id = null, Expression<Func<T, bool>> conditions = null, Expression<Func<T, object>>[] includes = null);
        public Task<Response> Create(T Entity);
        public Task<Response> Update(BaseEntity Entity);
        public bool Delete(Guid Id);


    }
}

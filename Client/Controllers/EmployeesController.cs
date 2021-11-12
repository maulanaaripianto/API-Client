using API.Models;
using API.ViewModel;
using Client.Base.Controllers;
using Client.Repositories.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Controllers
{
    /*[Authorize]*/
    public class EmployeesController : BaseController<Employee, EmployeeRepository, string>
    {
        private readonly EmployeeRepository repository;
        public EmployeesController(EmployeeRepository repository) : base(repository)
        {
            this.repository = repository;
        }

        public IActionResult Index()
        {
            return View();
        }

        /*[Authorize]*/
       /* [HttpGet("Logout/")]*/
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("index", "LoginData");
        }

        
        public async Task<JsonResult>GetEmployees()
        {
             var result = await repository.GetEmployees();
             return Json(result);
        }

        public async Task<JsonResult> Profile(string id)
        {
            var result = await repository.Profile(id);
            return Json(result);
        }

        public async Task<JsonResult> Register(RegisterVM registerVM)
        {
            var result = repository.Register(registerVM);
            return Json(result);
        }

       /* [ValidateAntiForgeryToken]*/
        /*[HttpPost("Auth/")]*/
        public async Task<IActionResult> Auth(LoginVM login)
        {
            var jwtToken = await repository.Auth(login);
            var token = jwtToken.Token;

            if (token == null)
            {
                return RedirectToAction("index", "LoginData");
            }

            HttpContext.Session.SetString("JWToken", token);
            //  HttpContext.Session.SetString("Name", jwtHandler.GetName(token));
            // HttpContext.Session.SetString("ProfilePicture", "assets/img/theme/user.png");

            return RedirectToAction("index", "DataEmployees");
        }

       
    }
}

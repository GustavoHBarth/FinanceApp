using System.ComponentModel.DataAnnotations;

namespace FinanceApp.Domain.Enums
{
    public enum CategoriaConta
    {
        Nenhuma = 0,

        [Display(Name = "Alimentação")]
        Alimentacao = 1,

        [Display(Name = "Transporte")]
        Transporte = 2,

        [Display(Name = "Moradia")]
        Moradia = 3,

        [Display(Name = "Educação")]
        Educacao = 4,

        [Display(Name = "Saúde")]
        Saude = 5,

        [Display(Name = "Lazer")]
        Lazer = 6,

        [Display(Name = "Contas Domésticas")]
        ContasDomesticas = 7,

        [Display(Name = "Outros")]
        Outros = 99
    }
}

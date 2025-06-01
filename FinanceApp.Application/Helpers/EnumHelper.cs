using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;

namespace FinanceApp.Shared.Helpers 
{
    public static class EnumHelper
    {
        /// <summary>
        /// Retorna uma lista de valores e nomes amigáveis de um enum.
        /// </summary>
        public static List<KeyValuePair<int, string>> GetEnumValuesWithDisplayName<T>() where T : Enum
        {
            return Enum.GetValues(typeof(T))
                .Cast<T>()
                .Select(e => new KeyValuePair<int, string>(
                    Convert.ToInt32(e),
                    GetDisplayName(e)
                ))
                .ToList();
        }

        /// <summary>
        /// Retorna o nome amigável de um valor enum com base no atributo Display.
        /// </summary>
        public static string GetDisplayName(Enum enumValue)
        {
            return enumValue.GetType()
                            .GetMember(enumValue.ToString())
                            .FirstOrDefault()?
                            .GetCustomAttribute<DisplayAttribute>()?
                            .GetName()
                   ?? enumValue.ToString();
        }
    }
}

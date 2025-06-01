using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;

namespace FinanceApp.UI.Web.Shared.Helpers
{
   public static class EnumHelper
    {
        public static List<KeyValuePair<int, string>> GetEnumValues<T>() where T : Enum
        {
            return Enum.GetValues(typeof(T))
                .Cast<T>()
                .Select(e => new KeyValuePair<int, string>(
                        Convert.ToInt32(e),
                        GetDisplayName(e)
                    ))
                .ToList();
        }

        private static string GetDisplayName<T>(T enumValue) where T : Enum
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

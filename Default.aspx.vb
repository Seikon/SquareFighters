Public Class _Default
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim lista As New List(Of String)
        lista.Add("BB")
        lista.Add("CC")
        lista.Add("A")
        For Each item In lista.Where(Function(x) x.ToUpper = "A")
            Response.Write(item)
        Next
        Session("des") = "Sesión prueba"
        prutxt1.Value = "Escriba aqui su parametro"
    End Sub

End Class
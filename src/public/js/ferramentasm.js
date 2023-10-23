
async function excluirMonstro(idMonstro) {
      const response = await fetch(`/user/monster/deletar/${idMonstro}`, {
        method: 'DELETE',
      })
      .catch(error => {
        throw new Error("Não excluiu")
      })

      window.location.reload();
}
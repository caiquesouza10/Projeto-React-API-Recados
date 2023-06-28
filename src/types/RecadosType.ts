type RecadosType = {
  id: string;
  description: string;
  title: string;
  arquivado: boolean;
}

export type ArquivarRecadoUser = {
  idUser: string;
  idRecado: string;
  arquivado: boolean;
}

export type CriarRecadosUserType = {
  idUser: string;
  description: string;
  title: string;
  arquivado: boolean;
}

export type DeletRecadoType = {
  idUser: string;
  idRecado: string
}

export type AtualizarRecadoType = {
  idUser?: string;
  idRecado: string;
  description: string;
  title: string;
  arquivado?: boolean
}

export default RecadosType;
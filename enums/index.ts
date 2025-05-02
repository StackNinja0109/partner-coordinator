export enum Gender {
    female = "女性",
    male = "男性",
    notAnswer = "回答しない"
}

export enum ExpeditionPossible {
    possible = "可能",
    notPossible = "不可",
    negotiable = "要相談",
    not = ""
}

export enum TeacherLicenseStatus {
    having = "あり",
    nothing = "なし",
    scheduledAcquisition = "取得予定",
    not = ""
}

export enum AnswerType {
    yes = "true",
    no = "false",
    notAnswer = ""
}

export enum SubscriptMailType {
    receive = "受け取る",
    not_receive = "受け取らない",
    not = ""
}

export enum ProjectScoutType {
    unsend = "未送信",
    scouted = "スカウト済",
    notInterested = "興味なし",
    ng = "NG"
}

export enum ProjectSelectionType {
    notStarted = "未対応",
    inProgress = "対応中",
    interview = "面談",
    adopted = "採用",
    change = "一括変更",
    notAdopted = "不採用",
    cancel = "辞退"
}

export enum ApplyOrScout {
    apply = "応募",
    scout = "スカウト"
}

export enum MessageType {
    application = "応募",
    scout = "スカウト",
    file = "ファイル",
    text = "テキスト"
}